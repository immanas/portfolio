package com.manasgantait.backend.portfolio_backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendContactEmail(String name, String email, String message) {
        SimpleMailMessage mail = new SimpleMailMessage();
        mail.setTo("yourgmail@gmail.com"); // where YOU receive messages
        mail.setSubject("New Portfolio Contact Message");
        mail.setText(
                "Name: " + name + "\n" +
                "Email: " + email + "\n\n" +
                message
        );

        mailSender.send(mail);
    }
}
