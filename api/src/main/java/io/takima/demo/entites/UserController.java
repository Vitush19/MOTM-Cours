package io.takima.demo.entites;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.supercsv.io.CsvBeanWriter;
import org.supercsv.io.ICsvBeanWriter;
import org.supercsv.prefs.CsvPreference;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.*;
import java.util.Optional;

@RestController
@RequestMapping("/users")
@CrossOrigin
public class UserController {

    private final UserDAO userDAO;

    @Autowired
    public UserController(UserDAO userDAO) {
        this.userDAO=userDAO;
    }

    @GetMapping()
    public List<User> getUsers() {
        Iterable<User> it = this.userDAO.findAll();
        List<User> users = new ArrayList<>();
        it.forEach(users::add);

        return users;
    }

    @PostMapping()
    public User addUser(@RequestBody User user) {
        return this.userDAO.save(user);
    }


    @GetMapping("/{id}")
    public User getUserUniq(@PathVariable Long id) {

        Optional<User> selectedUser = this.userDAO.findById(id);

        return selectedUser.orElse(null);

    }

    @GetMapping("/export")
    public void exportToCSV(HttpServletResponse response) throws IOException {
        response.setContentType("text/csv");
        DateFormat dateFormatter = new SimpleDateFormat("yyyy-MM-dd_HH-mm-ss");
        String currentDateTime = dateFormatter.format(new Date());

        String headerKey = "Content-Disposition";
        String headerValue = "attachment; filename=users_" + currentDateTime + ".csv";
        response.setHeader(headerKey, headerValue);

        ICsvBeanWriter csvWriter = new CsvBeanWriter(response.getWriter(), CsvPreference.STANDARD_PREFERENCE);
        String[] csvHeader = {"User ID", "Prénom", "Nom", "Date de naissance", "E-mail"};
        String[] nameMapping = {"id", "firstName", "lastName", "age", "mail"};

        csvWriter.writeHeader(csvHeader);

        for (User user : this.userDAO.findAll()) {
            csvWriter.write(user, nameMapping);
        }

        csvWriter.close();
    }

    @PutMapping()
    public User updateUser(@RequestBody User user) {
        if(this.userDAO.existsById(user.getId())){
            return this.userDAO.save(user);
        }
        return null;

    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Long id) {
        this.userDAO.deleteById(id);
    }
}
