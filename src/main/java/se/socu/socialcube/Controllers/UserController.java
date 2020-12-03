package se.socu.socialcube.Controllers;

import org.springframework.web.bind.annotation.*;
import se.socu.socialcube.Entities.UserSocu;
import se.socu.socialcube.Repository.UserRepository;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    private final UserRepository userRepository;

    @GetMapping("/users")
    public List<UserSocu> getUsers() {
        return (List<UserSocu>) userRepository.findAll();
    }

    @PostMapping("/users")
    void addUser(@RequestBody UserSocu userSocu){
        userRepository.save(userSocu);
    }
}