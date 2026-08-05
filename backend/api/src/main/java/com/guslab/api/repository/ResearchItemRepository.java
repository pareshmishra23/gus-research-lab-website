package com.guslab.api.repository;

import com.guslab.api.model.ResearchItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ResearchItemRepository extends JpaRepository<ResearchItem, Long> {
}
