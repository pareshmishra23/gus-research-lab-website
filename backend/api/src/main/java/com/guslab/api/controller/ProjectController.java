package com.guslab.api.controller;

import com.guslab.api.model.AuditLog;
import com.guslab.api.model.Project;
import com.guslab.api.repository.AuditLogRepository;
import com.guslab.api.repository.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.text.Normalizer;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Optional;
import java.util.regex.Pattern;

@RestController
@RequestMapping("/api/projects")
@CrossOrigin(origins = "*")
public class ProjectController {

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private AuditLogRepository auditLogRepository;

    private static final Pattern NONLATIN = Pattern.compile("[^\\w-]");
    private static final Pattern WHITESPACE = Pattern.compile("[\\s]");

    // PUBLIC: Get only published projects ordered by displayOrder
    @GetMapping("/public")
    public ResponseEntity<List<Project>> getPublicProjects() {
        return ResponseEntity.ok(projectRepository.findByPublishedTrueOrderByDisplayOrderAsc());
    }

    // PUBLIC: Get single published project by slug or ID
    @GetMapping("/public/{slugOrId}")
    public ResponseEntity<?> getPublicProjectDetail(@PathVariable String slugOrId) {
        Optional<Project> projectOpt = projectRepository.findBySlug(slugOrId);
        if (projectOpt.isEmpty()) {
            try {
                Long id = Long.parseLong(slugOrId);
                projectOpt = projectRepository.findById(id);
            } catch (NumberFormatException ignored) {}
        }

        if (projectOpt.isPresent() && Boolean.TRUE.equals(projectOpt.get().getPublished())) {
            return ResponseEntity.ok(projectOpt.get());
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Project not found or unpublished.");
    }

    // ADMIN: Get all projects (including drafts/unpublished)
    @GetMapping("/admin/all")
    @PreAuthorize("hasRole('ADMIN') or hasRole('SUPER_ADMIN')")
    public ResponseEntity<List<Project>> getAllProjectsForAdmin() {
        return ResponseEntity.ok(projectRepository.findAllByOrderByDisplayOrderAsc());
    }

    // ADMIN: Get Dashboard Project Metrics
    @GetMapping("/admin/metrics")
    @PreAuthorize("hasRole('ADMIN') or hasRole('SUPER_ADMIN')")
    public ResponseEntity<?> getAdminMetrics() {
        return ResponseEntity.ok(Map.of(
            "publishedCount", projectRepository.countByPublishedTrue(),
            "draftCount", projectRepository.countByPublishedFalse(),
            "featuredCount", projectRepository.countByFeaturedTrue(),
            "totalCount", projectRepository.count()
        ));
    }

    // ADMIN: Create Project
    @PostMapping("/admin")
    @PreAuthorize("hasRole('ADMIN') or hasRole('SUPER_ADMIN')")
    public ResponseEntity<?> createProject(@RequestBody Project project, Authentication authentication) {
        if (project.getTitle() == null || project.getTitle().trim().isEmpty()) {
            return ResponseEntity.badRequest().body("Title is required.");
        }

        // Validate Live Demo URL if present
        if (project.getLiveUrl() != null && !project.getLiveUrl().trim().isEmpty()) {
            if (!isValidUrl(project.getLiveUrl())) {
                return ResponseEntity.badRequest().body("Please enter a valid HTTP or HTTPS URL.");
            }
        }

        // Generate Slug
        String slug = generateSlug(project.getTitle());
        int counter = 1;
        String originalSlug = slug;
        while (projectRepository.existsBySlug(slug)) {
            slug = originalSlug + "-" + counter++;
        }
        project.setSlug(slug);

        if (project.getDisplayOrder() == null || project.getDisplayOrder() == 0) {
            project.setDisplayOrder((int) (projectRepository.count() + 1));
        }

        project.setCreatedBy(authentication.getName());
        project.setUpdatedBy(authentication.getName());

        Project saved = projectRepository.save(project);

        // Audit Log
        logAudit(authentication.getName(), "PROJECT_CREATED", saved.getTitle(), null, saved.getLiveUrl());

        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    // ADMIN: Update Project
    @PutMapping("/admin/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('SUPER_ADMIN')")
    public ResponseEntity<?> updateProject(@PathVariable Long id, @RequestBody Project updated, Authentication authentication) {
        Optional<Project> existingOpt = projectRepository.findById(id);
        if (existingOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Project not found.");
        }

        Project existing = existingOpt.get();
        String oldUrl = existing.getLiveUrl();

        // Validate URL
        if (updated.getLiveUrl() != null && !updated.getLiveUrl().trim().isEmpty()) {
            if (!isValidUrl(updated.getLiveUrl())) {
                return ResponseEntity.badRequest().body("Please enter a valid HTTP or HTTPS URL.");
            }
        }

        existing.setTitle(updated.getTitle());
        existing.setShortDescription(updated.getShortDescription());
        existing.setFullDescription(updated.getFullDescription());
        existing.setCategory(updated.getCategory());
        existing.setStatus(updated.getStatus());
        existing.setLiveUrl(updated.getLiveUrl());
        existing.setCtaText(updated.getCtaText());
        existing.setIconName(updated.getIconName());
        existing.setTags(updated.getTags());
        existing.setFeatured(updated.getFeatured());
        existing.setPublished(updated.getPublished());
        existing.setDisplayOrder(updated.getDisplayOrder());
        existing.setProblemStatement(updated.getProblemStatement());
        existing.setSolution(updated.getSolution());
        existing.setTechnology(updated.getTechnology());
        existing.setResearchNotes(updated.getResearchNotes());
        existing.setFutureDirection(updated.getFutureDirection());
        existing.setUpdatedBy(authentication.getName());

        Project saved = projectRepository.save(existing);

        // Audit Log
        if (oldUrl != null && !oldUrl.equals(saved.getLiveUrl())) {
            logAudit(authentication.getName(), "PROJECT_URL_CHANGED", saved.getTitle(), oldUrl, saved.getLiveUrl());
        } else {
            logAudit(authentication.getName(), "PROJECT_UPDATED", saved.getTitle(), null, saved.getTitle());
        }

        return ResponseEntity.ok(saved);
    }

    // ADMIN: Toggle Publish
    @PatchMapping("/admin/{id}/toggle-publish")
    @PreAuthorize("hasRole('ADMIN') or hasRole('SUPER_ADMIN')")
    public ResponseEntity<?> togglePublish(@PathVariable Long id, Authentication authentication) {
        Optional<Project> existingOpt = projectRepository.findById(id);
        if (existingOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Project not found.");
        }

        Project project = existingOpt.get();
        boolean newStatus = !Boolean.TRUE.equals(project.getPublished());
        project.setPublished(newStatus);
        project.setUpdatedBy(authentication.getName());
        projectRepository.save(project);

        String action = newStatus ? "PROJECT_PUBLISHED" : "PROJECT_UNPUBLISHED";
        logAudit(authentication.getName(), action, project.getTitle(), String.valueOf(!newStatus), String.valueOf(newStatus));

        return ResponseEntity.ok(project);
    }

    // ADMIN: Toggle Featured
    @PatchMapping("/admin/{id}/toggle-featured")
    @PreAuthorize("hasRole('ADMIN') or hasRole('SUPER_ADMIN')")
    public ResponseEntity<?> toggleFeatured(@PathVariable Long id, Authentication authentication) {
        Optional<Project> existingOpt = projectRepository.findById(id);
        if (existingOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Project not found.");
        }

        Project project = existingOpt.get();
        project.setFeatured(!Boolean.TRUE.equals(project.getFeatured()));
        project.setUpdatedBy(authentication.getName());
        projectRepository.save(project);

        return ResponseEntity.ok(project);
    }

    // ADMIN: Reorder Project (Up / Down)
    @PatchMapping("/admin/{id}/reorder")
    @PreAuthorize("hasRole('ADMIN') or hasRole('SUPER_ADMIN')")
    public ResponseEntity<?> reorderProject(@PathVariable Long id, @RequestParam String direction, Authentication authentication) {
        List<Project> allProjects = projectRepository.findAllByOrderByDisplayOrderAsc();
        int index = -1;
        for (int i = 0; i < allProjects.size(); i++) {
            if (allProjects.get(i).getId().equals(id)) {
                index = i;
                break;
            }
        }

        if (index == -1) return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Project not found.");

        if ("up".equalsIgnoreCase(direction) && index > 0) {
            Project current = allProjects.get(index);
            Project previous = allProjects.get(index - 1);
            int temp = current.getDisplayOrder();
            current.setDisplayOrder(previous.getDisplayOrder());
            previous.setDisplayOrder(temp);
            projectRepository.saveAll(List.of(current, previous));
        } else if ("down".equalsIgnoreCase(direction) && index < allProjects.size() - 1) {
            Project current = allProjects.get(index);
            Project next = allProjects.get(index + 1);
            int temp = current.getDisplayOrder();
            current.setDisplayOrder(next.getDisplayOrder());
            next.setDisplayOrder(temp);
            projectRepository.saveAll(List.of(current, next));
        }

        return ResponseEntity.ok(projectRepository.findAllByOrderByDisplayOrderAsc());
    }

    // ADMIN: Delete Project
    @DeleteMapping("/admin/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('SUPER_ADMIN')")
    public ResponseEntity<?> deleteProject(@PathVariable Long id, Authentication authentication) {
        Optional<Project> existingOpt = projectRepository.findById(id);
        if (existingOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Project not found.");
        }

        Project project = existingOpt.get();
        projectRepository.deleteById(id);

        logAudit(authentication.getName(), "PROJECT_DELETED", project.getTitle(), project.getLiveUrl(), null);

        return ResponseEntity.ok(Map.of("message", "Project permanently deleted successfully."));
    }

    // Helper: URL Validation
    private boolean isValidUrl(String url) {
        try {
            URI uri = new URI(url.trim());
            String scheme = uri.getScheme();
            return scheme != null && (scheme.equalsIgnoreCase("http") || scheme.equalsIgnoreCase("https"));
        } catch (Exception e) {
            return false;
        }
    }

    // Helper: Slug Generator
    private String generateSlug(String input) {
        String nowhitespace = WHITESPACE.matcher(input).replaceAll("-");
        String normalized = Normalizer.normalize(nowhitespace, Normalizer.Form.NFD);
        String slug = NONLATIN.matcher(normalized).replaceAll("");
        return slug.toLowerCase(Locale.ENGLISH);
    }

    // Helper: Log Audit Trail
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
