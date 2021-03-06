package io.takima.demo.mail;
import io.takima.demo.entites.User;
import io.takima.demo.entites.UserDAO;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.web.bind.annotation.*;
import org.supercsv.io.CsvBeanWriter;
import org.supercsv.io.ICsvBeanWriter;
import org.supercsv.prefs.CsvPreference;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.text.DateFormat;
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
    private final UserDAO userDAO;

    public MailController(MailDAO mailDAO, UserDAO userDAO) {
        this.mailDAO = mailDAO;
        this.userDAO = userDAO;
    }

    @GetMapping()
    public List<Mail> getMail() {
        Iterable<Mail> it = this.mailDAO.findAll();
        List<Mail> mails = new ArrayList<>();
        it.forEach(mails::add);

        return mails;
    }

    @GetMapping("/{id}")
    public Mail getMailByUser(@PathVariable Long id){
        Iterable<Mail> it = this.mailDAO.findAll();
        User user = null;
        if(this.userDAO.findById(id).isPresent()){
            user = this.userDAO.findById(id).get();
        }
        List<Mail> mails = new ArrayList<>();
        Date today = new Date();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        boolean check = false;
        Mail mailUser = null;
        it.forEach(mails::add);
        for(int i = 0; i < mails.toArray().length; i++){
            Mail m = mails.get(i);
            String dateMail = sdf.format(m.getDate());
            String dateToday = sdf.format(today);
            String[] partDateMail = dateMail.split("-");
            String[] partDateToday = dateToday.split("-");
            if(partDateMail[1].equals(partDateToday[1])){
                if(user != null && user.getMail().equals(m.getMail())){
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

    @GetMapping("/export")
    public void exportToCSV(HttpServletResponse response) throws IOException {
        response.setContentType("text/csv");
        DateFormat dateFormatter = new SimpleDateFormat("yyyy-MM-dd_HH-mm-ss");
        String currentDateTime = dateFormatter.format(new Date());

        String headerKey = "Content-Disposition";
        String headerValue = "attachment; filename=motm_" + currentDateTime + ".csv";
        response.setHeader(headerKey, headerValue);

        ICsvBeanWriter csvWriter = new CsvBeanWriter(response.getWriter(), CsvPreference.STANDARD_PREFERENCE);
        String[] csvHeader = {"User ID", "Note", "Commentaire", "Date de saisie", "E-mail"};
        String[] nameMapping = {"id", "note", "comment", "date", "mail"};

        csvWriter.writeHeader(csvHeader);

        for (Mail mail : this.mailDAO.findAll()) {
            csvWriter.write(mail, nameMapping);
        }

        csvWriter.close();
    }

    @PostMapping()
    public Mail addMail(@RequestBody Mail mail) {

        Iterable<Mail> it = this.mailDAO.findAll();
        List<Mail> mails = new ArrayList<>();
        boolean check = false;
        Date today = new Date();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        it.forEach(mails::add);
        for(int i = 0; i < mails.toArray().length; i++){
            Mail m = mails.get(i);
            if(m.getMail().equals(mail.getMail())){
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