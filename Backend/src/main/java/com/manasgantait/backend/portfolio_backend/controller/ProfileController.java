package com.manasgantait.backend.portfolio_backend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class ProfileController {

    @GetMapping("/profile")
    public Map<String, Object> getProfile() {
        return Map.of(
                "name", "Manas Gantait",
                "role", "Cloud & Backend Engineer",
                "skills", List.of(
                        "AWS",
                        "Terraform",
                        "Spring Boot",
                        "Docker",
                        "Kubernetes"
                ),
                "projects", List.of(
                        "CloudGuard360",
                        "GrowEasy",
                        "AutoShield",
                        "MCCP",
                        "PolicyGate",
                        "FinOpsGuard"
                )
        );
    }
}
