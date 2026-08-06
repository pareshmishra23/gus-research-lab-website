package com.guslab.api.controller;

import com.guslab.api.model.Video;
import com.guslab.api.repository.VideoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/videos")
@CrossOrigin(origins = "*")
public class VideoController {

    @Autowired
    private VideoRepository repository;

    @GetMapping
    public List<Video> getAllVideos() {
        return repository.findAll();
    }

    @PostMapping
    public Video createVideo(@RequestBody Video video) {
        return repository.save(video);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteVideo(@PathVariable Long id) {
        repository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
