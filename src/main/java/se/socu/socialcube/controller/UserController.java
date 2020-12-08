package se.socu.socialcube.controller;

import org.springframework.web.bind.annotation.*;
import se.socu.socialcube.DTO.UserDTO;
import se.socu.socialcube.entities.UserSocu;
import se.socu.socialcube.repository.UserRepository;
import se.socu.socialcube.service.UserService;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {

    public UserController(UserRepository userRepository, UserService userService) {
        this.userRepository = userRepository;
        this.userService = userService;
    }

    private final UserRepository userRepository;
    private final UserService userService;

    @GetMapping("/users")
    public List<UserDTO> getUsers() {
        return userService.getAllUserDTOs();
    }

    @PostMapping("/users")
    void addUser(@RequestBody UserSocu userSocu) {
        userRepository.save(userSocu);
    }

    @GetMapping("/user/{id}")
    public UserSocu getUser(@PathVariable long id) {
        return userRepository.findById(id);
    }

    @PostMapping("/login")
    public boolean authenticationApproved(@RequestBody String[] usercredentials) {
        return userService.checkIfLoginCredentialsAreCorrect(usercredentials[0], usercredentials[1]);
    }
}