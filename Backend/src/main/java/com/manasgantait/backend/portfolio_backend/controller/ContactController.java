package com.manasgantait.backend.portfolio_backend.controller;

import com.manasgantait.backend.portfolio_backend.service.EmailService;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api")
public class ContactController {

    private final EmailService emailService;

    public ContactController(EmailService emailService) {
        this.emailService = emailService;
    }

    @PostMapping("/contact")
    public String sendMessage(@RequestBody Map<String, String> payload) {
        emailService.sendContactEmail(
                payload.get("name"),
                payload.get("email"),
                payload.get("message")
        );
        return "Message sent successfully 🚀";
    }
}
