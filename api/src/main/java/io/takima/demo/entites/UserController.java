package io.takima.demo.entites;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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
