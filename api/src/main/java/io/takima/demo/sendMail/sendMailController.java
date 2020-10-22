package io.takima.demo.sendMail;

import io.takima.demo.User;
import io.takima.demo.UserDAO;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSenderImpl;
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

    //@Async
    public void sendMail(JavaMailSenderImpl mailSender, User user, String month) {

        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("motmjava@gmail.com");
        message.setTo(user.getMail());
        message.setSubject(" pour le mois de "+ month +" en dur");
        message.setText("Ouais je teste le mail");

        mailSender.send(message);
    }

    public static boolean isNotNullOrEmpty(String str) {
        if(str != null && !str.isEmpty())
            return true;
        return false;
    }

    //@Async
    //@Scheduled
    //@RequestMapping(value = "/sendSimpleEmail", method = RequestMethod.GET)
    //@PostMapping("/sendSimpleEmail")
    @Scheduled(cron = "0 19 19 22 * ?", zone = "Europe/Paris")
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
            sendMail(mailSender, user,"Mai");
        }
    }
}
