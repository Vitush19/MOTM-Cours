package io.takima.demo.sendMail;

import io.takima.demo.entites.User;
import io.takima.demo.entites.UserDAO;
import io.takima.demo.mail.Mail;
import io.takima.demo.mail.MailController;
import io.takima.demo.mail.MailDAO;
import org.jetbrains.annotations.NotNull;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Properties;

@RestController
@RequestMapping("/sendMail")
@CrossOrigin
@EnableAsync
@EnableScheduling
public class sendMailController {

    private final UserDAO userDAO;
    private final MailDAO mailDAO;
    private final MailController mailController;

    public sendMailController(UserDAO userDAO, MailDAO mailDAO, MailController mailController) {
        this.userDAO = userDAO;
        this.mailDAO = mailDAO;
        this.mailController = mailController;
    }

    @Async
    public void sendMail(JavaMailSenderImpl mailSender, User user, String title) {

        SimpleMailMessage message = new SimpleMailMessage();
        Long id = user.getId();
        message.setFrom("motmjava@gmail.com");
        message.setTo(user.getMail());
        message.setSubject(title);
        message.setText("Bonjour ! Nous nous permettons de vous envoyer un mail afin que vous remplissiez le MOTM. " +
                    "Veuillez compléter le formulaire sur le lien suivant : http://localhost:4200/mail-template/"+id);

        mailSender.send(message);
    }

    @Async
    public void sendMail(JavaMailSenderImpl mailSender, User user, String title, String msg) {

        SimpleMailMessage message = new SimpleMailMessage();
        Long id = user.getId();
        message.setFrom("motmjava@gmail.com");
        message.setTo(user.getMail());
        message.setSubject(title);
        message.setText(msg);

        mailSender.send(message);
    }

    @Async
    public void sendMail(JavaMailSenderImpl mailSender, User user, Integer notes, String comments, String title) {

        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("motmjava@gmail.com");
        message.setTo(user.getMail());
        message.setSubject(title);
        message.setText("Bonjour ! Nous nous permettons de vous envoyer un mail afin que vous ayez une visibilité sur le résultat de ce mois. " +
                    "Ce mois-ci nous avons obtenu une moyenne de notes égale à : "+ notes + ".Avec les commentaires suivants : " +comments);
        mailSender.send(message);
    }

    public static boolean isNotNullOrEmpty(String str) {
        return str != null && !str.isEmpty();
    }

    @Async
    @Scheduled(cron = "0 00 00 04 * ?", zone = "Europe/Paris")
    public void sendToUser(){

        String str = "Votre MOTM pour ce mois";
        JavaMailSenderImpl mailSender = getJavaMailSender();
        for(User user : this.userDAO.findAll()){
            if(isNotNullOrEmpty(user.getMail()))
            sendMail(mailSender, user, str);
        }
    }

    @Async
    @Scheduled(cron = "0 00 00 11 * ?", zone = "Europe/Paris")
    public void sendRemindersToUser(){

        JavaMailSenderImpl mailSender = getJavaMailSender();

        String str = "Reminder : N'oubliez pas de remplir votre MOTM";
        for(User user : this.userDAO.findAll()){
            Mail mail = this.mailController.getMailByUser(user.getId());
            String msg = "Nous nous permettons de vous envoyer un reminder pour vous rappeler de compléter votre formulaire"
                    + " pour le MOTM de ce mois au lien suivant : http://localhost:4200/mail-template/"+user.getId();
            if(mail == null && isNotNullOrEmpty(user.getMail())){
                    sendMail(mailSender, user, str, msg);
            }
        }
    }

    @Async
    @Scheduled(cron = "0 00 12 15 * ?", zone = "Europe/Paris")
    public void sendMonthlyUpdate(){

        Iterable<Mail> it = this.mailDAO.findAll();
        List<Mail> mails = new ArrayList<>();
        List<Mail> mailsStock = new ArrayList<>();
        Date today = new Date();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        it.forEach(mails::add);
        for(int i = 0; i < mails.toArray().length; i++){
            Mail m = mails.get(i);
            String dateMail = sdf.format(m.getDate());
            String dateToday = sdf.format(today);
            String[] partDateMail = dateMail.split("-");
            String[] partDateToday = dateToday.split("-");
            if(partDateMail[1].equals(partDateToday[1])){
                mailsStock.add(m);
            }
        }

        List<Integer> notes = new ArrayList<>();
        List<String> comments = new ArrayList<>();
        for(int j = 0; j < mailsStock.toArray().length; j++){
            Mail m = mailsStock.get(j);
            notes.add(m.getNote());
            comments.add(m.getComment());
        }

        int sum = 0;
        int result;
        StringBuilder str = new StringBuilder();
        String newLine = System.getProperty("line.separator");
        for(int k = 0; k < notes.toArray().length; k++){
            sum += notes.get(k);
            str.append(comments.get(k)).append(newLine);
        }
        if(notes.toArray().length == 0){
            result = 0;
        }
        else{
            result = sum/notes.toArray().length;
        }

        String title = "Récapitulatif du MOTM de ce mois";

        JavaMailSenderImpl mailSender = getJavaMailSender();
        for(User user : this.userDAO.findAll()){
            if(isNotNullOrEmpty(user.getMail()))
                sendMail(mailSender, user, result, str.toString(), title);
        }
    }

    @NotNull
    private JavaMailSenderImpl getJavaMailSender() {
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
        return mailSender;
    }
}
