package io.takima.demo.mail;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.web.bind.annotation.*;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
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
        Iterable<Mail> it = this.mailDAO.findAll();
        List<Mail> mails = new ArrayList<>();
        boolean check = false;
        it.forEach(e -> mails.add(e));
        for(int i = 0; i < mails.toArray().length; i++){
            Mail m = mails.get(i);
            if(m.getMail().equals(mail.getMail())){
                Date today = new Date();
                SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
                String dateMail = sdf.format(m.getDate());
                String dateToday = sdf.format(today);
                String[] partDateMail = dateMail.split("-");
                String[] partDateToday = dateToday.split("-");
                if(partDateMail[1].equals(partDateToday[1])){
                    check = true;
                }
            }
        }
        if(check){
            return null;
        }
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