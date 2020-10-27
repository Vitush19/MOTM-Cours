package io.takima.demo.mail;
import io.takima.demo.entites.User;
import io.takima.demo.entites.UserDAO;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.web.bind.annotation.*;

import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/mails")
@CrossOrigin
@EnableAsync
public class MailController {
    private final MailDAO mailDAO;
    private final UserDAO userDAO;
    public MailController(MailDAO mailDAO, UserDAO userDAO) {
        this.mailDAO = mailDAO;
        this.userDAO = userDAO;
    }

    @GetMapping()
    public List<Mail> getMail() {
        Iterable<Mail> it = this.mailDAO.findAll();
        List<Mail> mails = new ArrayList<>();
        it.forEach(e -> mails.add(e));

        return mails;
    }

    @GetMapping("/{id}")
    public Mail getUserUniq(@PathVariable Long id) {

        boolean check = false;
        Mail mailUser = null;
        Optional<User> selectedUser = this.userDAO.findById(id);
        if(selectedUser.isPresent()){
            List<Mail> mails = selectedUser.get().getMailList();
            for(int i = 0; i < mails.size(); i++){
                Date today = new Date();
                Mail m = mails.get(i);
                SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
                String dateMail = sdf.format(m.getDate());
                String dateToday = sdf.format(today);
                String[] partDateMail = dateMail.split("-");
                String[] partDateToday = dateToday.split("-");
                if(partDateMail[1].equals(partDateToday[1])){
                    check = true;
                    mailUser = m;
                }
            }
        }
        if(check){
            return mailUser;
        }
        return null;

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