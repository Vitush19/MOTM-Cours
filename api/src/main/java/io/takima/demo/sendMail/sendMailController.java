package io.takima.demo.sendMail;

import io.takima.demo.entites.User;
import io.takima.demo.entites.UserDAO;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Properties;

@RestController
@RequestMapping("/sendMail")
@CrossOrigin
@EnableAsync
@EnableScheduling
public class sendMailController {

    private final UserDAO userDAO;

    public sendMailController(UserDAO userDAO) {
        this.userDAO = userDAO;
    }

    @Async
    public void sendMail(JavaMailSenderImpl mailSender, User user) {

        SimpleMailMessage message = new SimpleMailMessage();
        Long id = user.getId();
        message.setFrom("motmjava@gmail.com");
        message.setTo(user.getMail());
        message.setSubject("Votre MOTM pour ce mois");
        message.setText("Bonjour ! Nous nous permettons de vous envoyer un mail afin que vous remplissiez le MOTM. " +
                "Veuillez compléter le formulaire sur le lien suivant : http://localhost:4200/mail-template/"+id);

        mailSender.send(message);
    }

    public static boolean isNotNullOrEmpty(String str) {
        if(str != null && !str.isEmpty())
            return true;
        return false;
    }

    @Async
    @Scheduled(cron = "0 44 00 28 * ?", zone = "Europe/Paris")
    public void sendToUser(){

        JavaMailSenderImpl mailSender = new JavaMailSenderImpl();
        mailSender.setHost("smtp.gmail.com");
        mailSender.setPort(587);
        mailSender.setUsername("motmjava@gmail.com");
        mailSender.setPassword("motmjava2020");

        Properties properties = mailSender.getJavaMailProperties();
        properties.put("mail.transport.protocol", "smtp");
        properties.put("mail.smtp.auth", "true");
        properties.put("mail.smtp.starttls.enable", "true");
        properties.put("mail.debug", "true");
        for(User user : this.userDAO.findAll()){
            if(isNotNullOrEmpty(user.getMail()))
            sendMail(mailSender, user);
        }
    }
}
