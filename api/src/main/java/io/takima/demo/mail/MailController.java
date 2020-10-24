package io.takima.demo.mail;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

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
}