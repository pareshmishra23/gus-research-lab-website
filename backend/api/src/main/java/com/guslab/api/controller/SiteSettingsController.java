package com.guslab.api.controller;

import com.guslab.api.model.AuditLog;
import com.guslab.api.model.SiteSettings;
import com.guslab.api.repository.AuditLogRepository;
import com.guslab.api.repository.SiteSettingsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class SiteSettingsController {

    @Autowired
    private SiteSettingsRepository siteSettingsRepository;

    @Autowired
    private AuditLogRepository auditLogRepository;

    // PUBLIC: Get current Site Settings
    @GetMapping("/site-settings")
    public ResponseEntity<?> getPublicSiteSettings() {
        List<SiteSettings> all = siteSettingsRepository.findAll();
        if (all.isEmpty()) {
            SiteSettings defaultSettings = new SiteSettings();
            return ResponseEntity.ok(defaultSettings);
        }
        return ResponseEntity.ok(all.get(0));
    }

    // ADMIN: Update Site Settings
    @PutMapping("/admin/site-settings")
    @PreAuthorize("hasRole('ADMIN') or hasRole('SUPER_ADMIN')")
    public ResponseEntity<?> updateSiteSettings(@RequestBody SiteSettings updated, Authentication authentication) {
        List<SiteSettings> all = siteSettingsRepository.findAll();
        SiteSettings current = all.isEmpty() ? new SiteSettings() : all.get(0);

        current.setSiteName(updated.getSiteName());
        current.setShortName(updated.getShortName());
        current.setFooterDescription(updated.getFooterDescription());
        current.setContactEmail(updated.getContactEmail());
        current.setContactPhone(updated.getContactPhone());
        current.setContactAddress(updated.getContactAddress());

        current.setHeroTitle(updated.getHeroTitle());
        current.setHeroSubtitle(updated.getHeroSubtitle());
        current.setPrimaryCtaLabel(updated.getPrimaryCtaLabel());
        current.setPrimaryCtaUrl(updated.getPrimaryCtaUrl());
        current.setSecondaryCtaLabel(updated.getSecondaryCtaLabel());
        current.setSecondaryCtaUrl(updated.getSecondaryCtaUrl());

        if (updated.getSocialLinks() != null) {
            current.setSocialLinks(updated.getSocialLinks());
        }
        if (updated.getFooterLinks() != null) {
            current.setFooterLinks(updated.getFooterLinks());
        }
        if (updated.getNavigationLinks() != null) {
            current.setNavigationLinks(updated.getNavigationLinks());
        }

        current.setUpdatedBy(authentication.getName());
        SiteSettings saved = siteSettingsRepository.save(current);

        logAudit(authentication.getName(), "SITE_SETTINGS_UPDATED", saved.getSiteName(), null, "Updated Site Settings & Footer");

        return ResponseEntity.ok(saved);
    }

    // PUBLIC/ADMIN: Get Navigation Links
    @GetMapping("/admin/navigation")
    public ResponseEntity<?> getNavigationLinks() {
        List<SiteSettings> all = siteSettingsRepository.findAll();
        if (all.isEmpty()) {
            return ResponseEntity.ok(List.of());
        }
        return ResponseEntity.ok(all.get(0).getNavigationLinks());
    }

    // ADMIN: Update Navigation Links
    @PutMapping("/admin/navigation")
    @PreAuthorize("hasRole('ADMIN') or hasRole('SUPER_ADMIN')")
    public ResponseEntity<?> updateNavigationLinks(@RequestBody List<SiteSettings.NavLink> navLinks, Authentication authentication) {
        List<SiteSettings> all = siteSettingsRepository.findAll();
        SiteSettings current = all.isEmpty() ? new SiteSettings() : all.get(0);

        current.setNavigationLinks(navLinks);
        current.setUpdatedBy(authentication.getName());
        SiteSettings saved = siteSettingsRepository.save(current);

        logAudit(authentication.getName(), "NAVIGATION_UPDATED", "Navigation Links", null, navLinks.size() + " items");

        return ResponseEntity.ok(saved.getNavigationLinks());
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
