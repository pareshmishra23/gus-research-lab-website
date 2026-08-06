package com.guslab.api.controller;

import com.guslab.api.model.Publication;
import com.guslab.api.repository.PublicationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/publications")
@CrossOrigin(origins = "*")
public class PublicationController {

    @Autowired
    private PublicationRepository repository;

    @GetMapping
    public List<Publication> getAllPublications() {
        return repository.findAll();
    }

    @PostMapping
    public Publication createPublication(@RequestBody Publication publication) {
        return repository.save(publication);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePublication(@PathVariable Long id) {
        repository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
