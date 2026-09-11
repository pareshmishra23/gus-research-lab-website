package com.guslab.api.config;

import com.guslab.api.model.Project;
import com.guslab.api.model.SiteSettings;
import com.guslab.api.model.User;
import com.guslab.api.repository.ProjectRepository;
import com.guslab.api.repository.SiteSettingsRepository;
import com.guslab.api.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private SiteSettingsRepository siteSettingsRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        // Seed Super Admin Account
        String adminEmail = "paresh.mishra23@gmail.com";
        String adminUsername = "paresh.mishra23@gmail.com";

        if (!userRepository.existsByEmail(adminEmail) && !userRepository.existsByUsername(adminUsername)) {
            User superAdmin = new User();
            superAdmin.setUsername(adminUsername);
            superAdmin.setEmail(adminEmail);
            superAdmin.setPassword(passwordEncoder.encode("GulluMishra23*"));
            superAdmin.setEnabled(true);
            superAdmin.setRoles(Set.of("ROLE_SUPER_ADMIN", "ROLE_ADMIN", "ROLE_USER"));

            userRepository.save(superAdmin);
            System.out.println(">>> Initialized Super Admin Account: " + adminEmail);
        } else {
            userRepository.findByEmail(adminEmail).ifPresent(user -> {
                if (!user.getRoles().contains("ROLE_SUPER_ADMIN")) {
                    user.getRoles().add("ROLE_SUPER_ADMIN");
                    user.getRoles().add("ROLE_ADMIN");
                    userRepository.save(user);
                }
            });
        }

        // Seed 5 Real Research Projects if empty
        if (projectRepository.count() == 0) {
            seedProjects();
        }

        // Seed Site Settings if empty
        if (siteSettingsRepository.count() == 0) {
            seedSiteSettings();
        }
    }

    private void seedSiteSettings() {
        SiteSettings settings = new SiteSettings();
        settings.setSiteName("GUS Research Lab");
        settings.setShortName("GUS LAB");
        settings.setFooterDescription("Pioneering scientific breakthroughs through innovation and collaboration.");
        settings.setContactEmail("info@guslab.res");
        settings.setContactPhone("+1 (555) 123-4567");
        settings.setContactAddress("123 Science Way, Research City");

        settings.setHeroTitle("Pioneering Scientific Discovery");
        settings.setHeroSubtitle("Advancing knowledge through innovative research, collaborative excellence, and cutting-edge technology.");
        settings.setPrimaryCtaLabel("Explore Research");
        settings.setPrimaryCtaUrl("/research");
        settings.setSecondaryCtaLabel("View Projects");
        settings.setSecondaryCtaUrl("/research");

        // Footer Quick Links
        List<SiteSettings.FooterLink> footerLinks = List.of(
            new SiteSettings.FooterLink("Home", "/", true, 1),
            new SiteSettings.FooterLink("Research", "/research", true, 2),
            new SiteSettings.FooterLink("Publications", "/publications", true, 3),
            new SiteSettings.FooterLink("Videos", "/videos", true, 4),
            new SiteSettings.FooterLink("AI Assistant", "/ai-assistant", true, 5),
            new SiteSettings.FooterLink("Admin Panel", "/admin", true, 6)
        );
        settings.setFooterLinks(new ArrayList<>(footerLinks));

        // Social Links
        List<SiteSettings.SocialLink> socialLinks = List.of(
            new SiteSettings.SocialLink("GitHub", "https://github.com", true, 1),
            new SiteSettings.SocialLink("LinkedIn", "https://linkedin.com", true, 2),
            new SiteSettings.SocialLink("YouTube", "https://youtube.com", true, 3),
            new SiteSettings.SocialLink("X / Twitter", "https://x.com", true, 4)
        );
        settings.setSocialLinks(new ArrayList<>(socialLinks));

        // Navigation Links
        List<SiteSettings.NavLink> navLinks = List.of(
            new SiteSettings.NavLink("Home", "/", true, 1),
            new SiteSettings.NavLink("Research", "/research", true, 2),
            new SiteSettings.NavLink("Blog", "/blog", true, 3),
            new SiteSettings.NavLink("Publications", "/publications", true, 4),
            new SiteSettings.NavLink("Videos", "/videos", true, 5),
            new SiteSettings.NavLink("AI Assistant", "/ai-assistant", true, 6)
        );
        settings.setNavigationLinks(new ArrayList<>(navLinks));

        settings.setUpdatedBy("SYSTEM");
        siteSettingsRepository.save(settings);
        System.out.println(">>> Initialized Site Settings in Database!");
    }

    private void seedProjects() {
        Project p1 = new Project();
        p1.setSlug("agentic-corporate-action");
        p1.setTitle("GUS Agentic Enterprise Corporate Action AI");
        p1.setCategory("Agentic AI / Enterprise Systems");
        p1.setShortDescription("Deterministic Integration + Governed Agentic Reasoning for enterprise corporate action environments and automated notification pipelines.");
        p1.setFullDescription("GUS Agentic Enterprise Corporate Action AI is an intelligent enterprise platform providing deterministic system integration combined with governed agentic reasoning to automate complex corporate action workflows, multi-channel notifications, and event lifecycle management.");
        p1.setLiveUrl("http://92.4.69.1:8000/");
        p1.setStatus("LIVE DEMO");
        p1.setCtaText("Launch Agentic AI");
        p1.setIconName("Bot");
        p1.setTags(List.of("Agentic AI", "Corporate Action", "Governed AI", "Enterprise Integration", "Notifications"));
        p1.setFeatured(true);
        p1.setPublished(true);
        p1.setDisplayOrder(1);
        p1.setProblemStatement("Corporate action processing in enterprise financial systems requires rigid deterministic integration combined with intelligent context-aware reasoning.");
        p1.setSolution("Combines governed AI agent execution loops with deterministic enterprise integration connectors.");
        p1.setTechnology(List.of("Agentic AI Frameworks", "Python / FastAPI", "Governed Reasoning Engines", "Enterprise Connectors"));

        Project p2 = new Project();
        p2.setSlug("document-intelligence");
        p2.setTitle("GUS Document Intelligence & OCR");
        p2.setCategory("AI / Document Intelligence");
        p2.setShortDescription("An AI-powered document intelligence system for extracting, processing and understanding information from documents using OCR.");
        p2.setFullDescription("GUS Document Intelligence & OCR is an experimental AI platform designed to automate document ingestion, optical character recognition (OCR), structural text extraction, and intelligent semantic parsing.");
        p2.setLiveUrl("https://pareshmishra-document-intelligence-ocr.hf.space");
        p2.setStatus("LIVE DEMO");
        p2.setCtaText("Launch Demo");
        p2.setIconName("FileText");
        p2.setTags(List.of("AI", "OCR", "Document Intelligence", "NLP"));
        p2.setFeatured(true);
        p2.setPublished(true);
        p2.setDisplayOrder(2);

        Project p3 = new Project();
        p3.setSlug("kundali");
        p3.setTitle("GUS Kundali / Computational Astrology");
        p3.setCategory("Computational Astrology / AI Research");
        p3.setShortDescription("A computational astrology application that generates and presents astrological chart information from user birth data.");
        p3.setFullDescription("GUS Kundali is a software application exploring positional calculations, planetary coordinates, and astrological chart generation using computational algorithms.");
        p3.setLiveUrl("https://pareshmishra-kundali.static.hf.space");
        p3.setStatus("LIVE DEMO");
        p3.setCtaText("Open Kundali");
        p3.setIconName("Compass");
        p3.setTags(List.of("Astrology", "Computational AI", "Chart Engine"));
        p3.setFeatured(true);
        p3.setPublished(true);
        p3.setDisplayOrder(3);

        Project p4 = new Project();
        p4.setSlug("earthquake");
        p4.setTitle("QuakeGuard / Earthquake Intelligence Dashboard");
        p4.setCategory("AI / Earthquake / Sensor Intelligence");
        p4.setShortDescription("An AI-oriented earthquake monitoring and event visualization project focused on detecting, processing and presenting seismic activity.");
        p4.setFullDescription("QuakeGuard is an experimental seismic activity visualization and sensor data intelligence dashboard designed to monitor and present global earthquake events.");
        p4.setLiveUrl("https://pareshmishra-earthquake-dashboard.hf.space");
        p4.setStatus("LIVE DEMO");
        p4.setCtaText("Open Earthquake Dashboard");
        p4.setIconName("Activity");
        p4.setTags(List.of("Earthquake Intelligence", "Sensors", "Data Visualization"));
        p4.setFeatured(true);
        p4.setPublished(true);
        p4.setDisplayOrder(4);

        Project p5 = new Project();
        p5.setSlug("stocksignalai");
        p5.setTitle("StockSignalAI");
        p5.setCategory("AI / Financial Analytics");
        p5.setShortDescription("An AI/ML-oriented stock analysis and market intelligence application designed to explore market data, signals and analytical indicators.");
        p5.setFullDescription("StockSignalAI is a financial analytical workspace leveraging machine learning and quantitative indicators to process stock market data and technical signals.");
        p5.setLiveUrl("https://pareshmishra-stocksignalai.hf.space");
        p5.setStatus("LIVE DEMO");
        p5.setCtaText("Launch StockSignalAI");
        p5.setIconName("TrendingUp");
        p5.setTags(List.of("AI / ML", "Financial Analytics", "Market Signals"));
        p5.setFeatured(true);
        p5.setPublished(true);
        p5.setDisplayOrder(5);

        projectRepository.saveAll(List.of(p1, p2, p3, p4, p5));
        System.out.println(">>> Initialized 5 Real Research Projects in Database!");
    }
}
