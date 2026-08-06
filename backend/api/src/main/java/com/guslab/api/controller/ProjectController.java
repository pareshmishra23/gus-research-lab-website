package com.guslab.api.controller;

import com.guslab.api.model.Project;
import com.guslab.api.repository.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/projects")
@CrossOrigin(origins = "*")
public class ProjectController {

    @Autowired
    private ProjectRepository repository;

    @GetMapping
    public List<Project> getAllProjects() {
        return repository.findAll();
    }

    @PostMapping
    public Project createProject(@RequestBody Project project) {
        return repository.save(project);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProject(@PathVariable Long id) {
        repository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
