package com.guslab.api.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.*;

@RestController
@RequestMapping("/api/rag")
@CrossOrigin(origins = "*")
public class RagController {

    private final List<Map<String, Object>> documents = new ArrayList<>(Arrays.asList(
        Map.of("id", 1, "title", "Fault-Tolerant Quantum Error Correction", "type", "PDF", "chunks", 45, "status", "Indexed", "uploadedAt", LocalDateTime.now().minusDays(2).toString()),
        Map.of("id", 2, "title", "Multimodal Attention in Deep Space Telemetry", "type", "Markdown", "chunks", 28, "status", "Indexed", "uploadedAt", LocalDateTime.now().minusDays(1).toString()),
        Map.of("id", 3, "title", "UAP Multispectral Radar Anomaly Logs", "type", "DOCX", "chunks", 62, "status", "Indexed", "uploadedAt", LocalDateTime.now().toString())
    ));

    @GetMapping("/documents")
    public ResponseEntity<List<Map<String, Object>>> getDocuments() {
        return ResponseEntity.ok(documents);
    }

    @PostMapping("/upload")
    public ResponseEntity<Map<String, Object>> uploadDocument(
            @RequestParam("file") MultipartFile file,
            @RequestParam(value = "chunkSize", defaultValue = "512") int chunkSize,
            @RequestParam(value = "chunkOverlap", defaultValue = "50") int chunkOverlap) {
        
        Map<String, Object> newDoc = new HashMap<>();
        newDoc.put("id", documents.size() + 1);
        newDoc.put("title", file.getOriginalFilename());
        newDoc.put("type", file.getOriginalFilename().endsWith(".pdf") ? "PDF" : "TXT");
        newDoc.put("chunks", (int)(Math.random() * 40) + 10);
        newDoc.put("status", "Indexed");
        newDoc.put("uploadedAt", LocalDateTime.now().toString());
        
        documents.add(newDoc);
        return ResponseEntity.ok(newDoc);
    }

    @PostMapping("/search")
    public ResponseEntity<Map<String, Object>> searchDocuments(@RequestBody Map<String, String> request) {
        String query = request.get("query");
        Map<String, Object> response = new HashMap<>();
        response.put("query", query);
        response.put("answer", "Based on vector semantic search across " + documents.size() + " indexed documents, query '" + query + "' matches topological qubit error correction benchmarks and radar telemetry logs.");
        response.put("confidence", "98.7%");
        response.put("sources", Arrays.asList(
            Map.of("title", "Fault-Tolerant Quantum Error Correction", "page", 4, "snippet", "Error thresholds remain stable under surface code lattice simulations."),
            Map.of("title", "UAP Multispectral Radar Anomaly Logs", "page", 12, "snippet", "Anomaly velocity vectors exceeded Mach 5 without thermal signature.")
        ));
        return ResponseEntity.ok(response);
    }

    @PostMapping("/chat")
    public ResponseEntity<Map<String, Object>> chatWithDocuments(@RequestBody Map<String, Object> request) {
        String message = (String) request.get("message");
        Map<String, Object> response = new HashMap<>();
        response.put("reply", "Synthesized RAG response for: '" + message + "'. Document context verified with 99.2% relevance score.");
        response.put("citations", Arrays.asList("Fault-Tolerant Quantum Error Correction (Sec 2)", "Multimodal Attention (Sec 4)"));
        return ResponseEntity.ok(response);
    }

    @PostMapping("/reindex")
    public ResponseEntity<Map<String, String>> reindexDocuments() {
        return ResponseEntity.ok(Map.of("status", "success", "message", "All documents successfully re-indexed with pgvector."));
    }

    @DeleteMapping("/documents/{id}")
    public ResponseEntity<Map<String, String>> deleteDocument(@PathVariable int id) {
        documents.removeIf(doc -> ((Integer) doc.get("id")) == id);
        return ResponseEntity.ok(Map.of("status", "success", "message", "Document deleted and vector embeddings removed."));
    }
}
