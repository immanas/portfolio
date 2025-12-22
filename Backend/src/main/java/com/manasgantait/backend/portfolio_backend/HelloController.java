package com.manasgantait.backend.portfolio_backend;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*")
@RestController
public class HelloController {

    @GetMapping("/api/health")
    public String healthCheck() {
        return "Backend is running 🚀";
    }
}
