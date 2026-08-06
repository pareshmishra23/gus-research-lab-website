package com.guslab.api.service;

import com.guslab.api.exception.ResourceNotFoundException;
import com.guslab.api.model.Article;
import com.guslab.api.repository.ArticleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ArticleService {

    @Autowired
    private ArticleRepository repository;

    public List<Article> getAllArticles() {
        return repository.findAll();
    }

    public Article getArticleById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Article not found with id: " + id));
    }

    public Article createArticle(Article article) {
        return repository.save(article);
    }

    public Article updateArticle(Long id, Article articleDetails) {
        Article article = getArticleById(id);
        article.setTitle(articleDetails.getTitle());
        article.setContent(articleDetails.getContent());
        article.setAuthor(articleDetails.getAuthor());
        article.setCategory(articleDetails.getCategory());
        article.setTags(articleDetails.getTags());
        return repository.save(article);
    }

    public void deleteArticle(Long id) {
        Article article = getArticleById(id);
        repository.delete(article);
    }
}
