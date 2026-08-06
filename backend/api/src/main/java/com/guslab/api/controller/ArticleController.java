package com.guslab.api.controller;

import com.guslab.api.model.Article;
import com.guslab.api.service.ArticleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/articles")
@CrossOrigin(origins = "*")
public class ArticleController {

    @Autowired
    private ArticleService service;

    @GetMapping
    public List<Article> getAllArticles() {
        return service.getAllArticles();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Article> getArticleById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getArticleById(id));
    }

    @PostMapping
    public Article createArticle(@RequestBody Article article) {
        return service.createArticle(article);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Article> updateArticle(@PathVariable Long id, @RequestBody Article article) {
        return ResponseEntity.ok(service.updateArticle(id, article));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteArticle(@PathVariable Long id) {
        service.deleteArticle(id);
        return ResponseEntity.noContent().build();
    }
}
