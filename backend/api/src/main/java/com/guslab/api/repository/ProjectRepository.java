package com.guslab.api.repository;

import com.guslab.api.model.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {
    List<Project> findByPublishedTrueOrderByDisplayOrderAsc();
    List<Project> findAllByOrderByDisplayOrderAsc();
    Optional<Project> findBySlug(String slug);
    Boolean existsBySlug(String slug);
    Long countByPublishedTrue();
    Long countByPublishedFalse();
    Long countByFeaturedTrue();
}
