package io.takima.demo.mail;
import io.takima.demo.User;
import org.apache.logging.log4j.message.SimpleMessage;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Properties;

@RestController
@RequestMapping("/mails")
@CrossOrigin
@EnableAsync
public class MailController {
    private final MailDAO mailDAO;

    public MailController(MailDAO mailDAO) {
        this.mailDAO = mailDAO;
    }

    @GetMapping()
    public List<Mail> getMail() {
        Iterable<Mail> it = this.mailDAO.findAll();
        List<Mail> mails = new ArrayList<>();
        it.forEach(e -> mails.add(e));

        return mails;
    }

    @PostMapping()
    public Mail addMail(@RequestBody Mail mail) {
        return this.mailDAO.save(mail);
    }

    @DeleteMapping("/{id}")
    public void deleteMail(@PathVariable Long id) {
        this.mailDAO.deleteById(id);
    }

    @PutMapping()
    public Mail updateMail(@RequestBody Mail mail) {
        if(this.mailDAO.existsById(mail.getId())){
            return this.mailDAO.save(mail);
        }
        return null;
    }

    //@Async
    public void sendMail(JavaMailSenderImpl mailSender, String month) {

        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("motmjava@gmail.com");
        message.setTo("sutharsanvithusan@gmail.com");
        message.setSubject(" pour le mois de "+ month +" en dur");
        message.setText("Ouais je teste le mail");

        mailSender.send(message);
    }

    //@Async
    //@Scheduled
    //@RequestMapping(value = "/sendSimpleEmail", method = RequestMethod.GET)
    @PostMapping("/sendSimpleEmail")
    public String sendToUser(){

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

        sendMail(mailSender, "Mai");
        return "sitrng";
    }
}