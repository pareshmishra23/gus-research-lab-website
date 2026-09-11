package com.guslab.api.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "audit_logs")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AuditLog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;
    private String action; // e.g. PROJECT_CREATED, PROJECT_UPDATED, PROJECT_PUBLISHED, PROJECT_UNPUBLISHED, PROJECT_DELETED, PROJECT_URL_CHANGED, ADMIN_CREATED, ADMIN_DISABLED, ADMIN_ENABLED, ROLE_CHANGED
    private String target;
    
    @Column(columnDefinition = "TEXT")
    private String previousValue;

    @Column(columnDefinition = "TEXT")
    private String newValue;

    private LocalDateTime timestamp;

    @PrePersist
    protected void onCreate() {
        timestamp = LocalDateTime.now();
    }
}
