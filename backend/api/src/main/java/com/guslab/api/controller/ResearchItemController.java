package com.guslab.api.controller;

import com.guslab.api.model.ResearchItem;
import com.guslab.api.repository.ResearchItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/items")
@CrossOrigin(origins = "*") // Allow React frontend to access
public class ResearchItemController {

    @Autowired
    private ResearchItemRepository repository;

    @GetMapping
    public List<ResearchItem> getAllItems() {
        return repository.findAll();
    }

    @PostMapping
    public ResearchItem createItem(@RequestBody ResearchItem item) {
        return repository.save(item);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteItem(@PathVariable Long id) {
        return repository.findById(id)
                .map(item -> {
                    repository.delete(item);
                    return ResponseEntity.ok().build();
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
