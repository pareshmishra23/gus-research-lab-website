package com.guslab.api.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "site_settings")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SiteSettings {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Brand Settings
    private String siteName = "GUS Research Lab";
    private String shortName = "GUS LAB";
    
    @Column(columnDefinition = "TEXT")
    private String footerDescription = "Pioneering scientific breakthroughs through innovation and collaboration.";

    // Contact Information
    private String contactEmail = "info@guslab.res";
    private String contactPhone = "+1 (555) 123-4567";
    private String contactAddress = "123 Science Way, Research City";

    // Homepage Configuration
    private String heroTitle = "Pioneering Scientific Discovery";
    
    @Column(columnDefinition = "TEXT")
    private String heroSubtitle = "Advancing knowledge through innovative research, collaborative excellence, and cutting-edge technology.";
    
    private String primaryCtaLabel = "Explore Research";
    private String primaryCtaUrl = "/research";
    private String secondaryCtaLabel = "View Projects";
    private String secondaryCtaUrl = "/research";

    // Social Links
    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "site_social_links", joinColumns = @JoinColumn(name = "settings_id"))
    private List<SocialLink> socialLinks = new ArrayList<>();

    // Quick / Footer Links
    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "site_footer_links", joinColumns = @JoinColumn(name = "settings_id"))
    private List<FooterLink> footerLinks = new ArrayList<>();

    // Navigation Links
    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "site_nav_links", joinColumns = @JoinColumn(name = "settings_id"))
    private List<NavLink> navigationLinks = new ArrayList<>();

    private LocalDateTime updatedAt;
    private String updatedBy;

    @PrePersist
    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

    @Embeddable
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class SocialLink {
        private String platform;
        private String url;
        private Boolean enabled = true;
        private Integer displayOrder = 1;
    }

    @Embeddable
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class FooterLink {
        private String label;
        private String url;
        private Boolean enabled = true;
        private Integer displayOrder = 1;
    }

    @Embeddable
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class NavLink {
        private String label;
        private String url;
        private Boolean enabled = true;
        private Integer displayOrder = 1;
    }
}
