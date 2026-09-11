package com.guslab.api.controller;

import com.guslab.api.model.AuditLog;
import com.guslab.api.model.User;
import com.guslab.api.repository.AuditLogRepository;
import com.guslab.api.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/admin/users")
@CrossOrigin(origins = "*")
public class AdminUserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AuditLogRepository auditLogRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // GET /api/admin/users - List all admin users (SUPER_ADMIN required)
    @GetMapping
    @PreAuthorize("hasRole('SUPER_ADMIN')")
    public ResponseEntity<?> getAllUsers() {
        List<User> users = userRepository.findAll();
        // Return users with passwords scrubbed
        List<Map<String, Object>> response = users.stream().map(u -> {
            Map<String, Object> map = new HashMap<>();
            map.put("id", u.getId());
            map.put("username", u.getUsername());
            map.put("email", u.getEmail());
            map.put("enabled", u.getEnabled());
            map.put("roles", u.getRoles());
            map.put("primaryRole", getPrimaryRole(u.getRoles()));
            return map;
        }).collect(Collectors.toList());

        return ResponseEntity.ok(response);
    }

    // POST /api/admin/users - Create new admin user (SUPER_ADMIN required)
    @PostMapping
    @PreAuthorize("hasRole('SUPER_ADMIN')")
    public ResponseEntity<?> createUser(@RequestBody Map<String, Object> payload, Authentication authentication) {
        String username = (String) payload.get("username");
        String email = (String) payload.get("email");
        String password = (String) payload.get("password");
        String requestedRole = (String) payload.get("role"); // e.g. SUPER_ADMIN, ADMIN, ROLE_SUPER_ADMIN, ROLE_ADMIN
        Boolean enabled = payload.get("enabled") != null ? (Boolean) payload.get("enabled") : true;

        if (email == null || email.trim().isEmpty()) {
            return ResponseEntity.badRequest().body("Email is required.");
        }
        if (username == null || username.trim().isEmpty()) {
            username = email.trim();
        }
        if (password == null || password.trim().isEmpty()) {
            return ResponseEntity.badRequest().body("Password is required.");
        }

        if (userRepository.existsByEmail(email) || userRepository.existsByUsername(username)) {
            return ResponseEntity.badRequest().body("User with this email/username already exists.");
        }

        User newUser = new User();
        newUser.setUsername(username.trim());
        newUser.setEmail(email.trim());
        newUser.setPassword(passwordEncoder.encode(password));
        newUser.setEnabled(enabled);

        Set<String> roles = new HashSet<>();
        roles.add("ROLE_USER");

        if (requestedRole != null && (requestedRole.equalsIgnoreCase("SUPER_ADMIN") || requestedRole.equalsIgnoreCase("ROLE_SUPER_ADMIN"))) {
            roles.add("ROLE_SUPER_ADMIN");
            roles.add("ROLE_ADMIN");
        } else {
            roles.add("ROLE_ADMIN");
        }
        newUser.setRoles(roles);

        User saved = userRepository.save(newUser);

        // Audit Log
        logAudit(authentication.getName(), "ADMIN_CREATED", saved.getEmail(), null, getPrimaryRole(saved.getRoles()));

        Map<String, Object> map = new HashMap<>();
        map.put("id", saved.getId());
        map.put("username", saved.getUsername());
        map.put("email", saved.getEmail());
        map.put("enabled", saved.getEnabled());
        map.put("roles", saved.getRoles());
        map.put("primaryRole", getPrimaryRole(saved.getRoles()));

        return ResponseEntity.status(HttpStatus.CREATED).body(map);
    }

    // PATCH /api/admin/users/{id}/status - Enable/Disable user
    @PatchMapping("/{id}/status")
    @PreAuthorize("hasRole('SUPER_ADMIN')")
    public ResponseEntity<?> toggleUserStatus(@PathVariable Long id, @RequestBody Map<String, Boolean> payload, Authentication authentication) {
        Optional<User> userOpt = userRepository.findById(id);
        if (userOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found.");
        }

        User user = userOpt.get();
        Boolean targetEnabled = payload.get("enabled");
        if (targetEnabled == null) {
            targetEnabled = !Boolean.TRUE.equals(user.getEnabled());
        }

        // LAST SUPER ADMIN PROTECTION: Cannot disable the last active SUPER_ADMIN
        if (!targetEnabled && isSuperAdmin(user)) {
            long activeSuperAdmins = countActiveSuperAdmins();
            if (activeSuperAdmins <= 1) {
                return ResponseEntity.badRequest().body("Cannot disable the last active SUPER_ADMIN.");
            }
        }

        boolean prevStatus = Boolean.TRUE.equals(user.getEnabled());
        user.setEnabled(targetEnabled);
        userRepository.save(user);

        String action = targetEnabled ? "ADMIN_ENABLED" : "ADMIN_DISABLED";
        logAudit(authentication.getName(), action, user.getEmail(), String.valueOf(prevStatus), String.valueOf(targetEnabled));

        return ResponseEntity.ok(Map.of("id", user.getId(), "enabled", user.getEnabled(), "email", user.getEmail()));
    }

    // PUT /api/admin/users/{id}/role - Change Role
    @PutMapping("/{id}/role")
    @PreAuthorize("hasRole('SUPER_ADMIN')")
    public ResponseEntity<?> updateUserRole(@PathVariable Long id, @RequestBody Map<String, String> payload, Authentication authentication) {
        Optional<User> userOpt = userRepository.findById(id);
        if (userOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found.");
        }

        User user = userOpt.get();
        String newRoleStr = payload.get("role");
        if (newRoleStr == null || newRoleStr.trim().isEmpty()) {
            return ResponseEntity.badRequest().body("Role is required.");
        }

        boolean willBeSuperAdmin = newRoleStr.equalsIgnoreCase("SUPER_ADMIN") || newRoleStr.equalsIgnoreCase("ROLE_SUPER_ADMIN");

        // LAST SUPER ADMIN PROTECTION: Cannot demote the last active SUPER_ADMIN
        if (isSuperAdmin(user) && !willBeSuperAdmin) {
            long activeSuperAdmins = countActiveSuperAdmins();
            if (activeSuperAdmins <= 1) {
                return ResponseEntity.badRequest().body("Cannot demote the last active SUPER_ADMIN.");
            }
        }

        String prevRole = getPrimaryRole(user.getRoles());
        Set<String> roles = new HashSet<>();
        roles.add("ROLE_USER");
        if (willBeSuperAdmin) {
            roles.add("ROLE_SUPER_ADMIN");
            roles.add("ROLE_ADMIN");
        } else {
            roles.add("ROLE_ADMIN");
        }

        user.setRoles(roles);
        userRepository.save(user);

        logAudit(authentication.getName(), "ROLE_CHANGED", user.getEmail(), prevRole, getPrimaryRole(user.getRoles()));

        return ResponseEntity.ok(Map.of("id", user.getId(), "email", user.getEmail(), "roles", user.getRoles(), "primaryRole", getPrimaryRole(user.getRoles())));
    }

    // DELETE /api/admin/users/{id} - Delete user
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('SUPER_ADMIN')")
    public ResponseEntity<?> deleteUser(@PathVariable Long id, Authentication authentication) {
        Optional<User> userOpt = userRepository.findById(id);
        if (userOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found.");
        }

        User user = userOpt.get();

        // LAST SUPER ADMIN PROTECTION: Cannot delete the last active SUPER_ADMIN
        if (isSuperAdmin(user)) {
            long activeSuperAdmins = countActiveSuperAdmins();
            if (activeSuperAdmins <= 1) {
                return ResponseEntity.badRequest().body("Cannot delete the last active SUPER_ADMIN.");
            }
        }

        userRepository.deleteById(id);
        logAudit(authentication.getName(), "ADMIN_DELETED", user.getEmail(), getPrimaryRole(user.getRoles()), null);

        return ResponseEntity.ok(Map.of("message", "Administrator removed successfully."));
    }

    private boolean isSuperAdmin(User user) {
        return user.getRoles() != null && user.getRoles().contains("ROLE_SUPER_ADMIN");
    }

    private long countActiveSuperAdmins() {
        return userRepository.findAll().stream()
                .filter(u -> Boolean.TRUE.equals(u.getEnabled()) && isSuperAdmin(u))
                .count();
    }

    private String getPrimaryRole(Set<String> roles) {
        if (roles == null) return "ADMIN";
        if (roles.contains("ROLE_SUPER_ADMIN")) return "SUPER_ADMIN";
        if (roles.contains("ROLE_ADMIN")) return "ADMIN";
        return "USER";
    }

    private void logAudit(String username, String action, String target, String prevVal, String newVal) {
        AuditLog log = new AuditLog();
        log.setUsername(username);
        log.setAction(action);
        log.setTarget(target);
        log.setPreviousValue(prevVal);
        log.setNewValue(newVal);
        auditLogRepository.save(log);
    }
}
