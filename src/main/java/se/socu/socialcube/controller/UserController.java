package se.socu.socialcube.controller;

import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import se.socu.socialcube.DTO.UserDTO;
import se.socu.socialcube.entities.UserSocu;
import se.socu.socialcube.repository.UserRepository;
import se.socu.socialcube.service.UserService;

import java.awt.*;
import java.net.URI;
import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/")
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

    @RequestMapping(value = "/login", method = RequestMethod.GET, produces = MediaType.TEXT_PLAIN_VALUE)
    @ResponseBody
    public ResponseEntity<Boolean> checkAuthenticationStatus(@RequestBody String[] usercredentials) {
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.set("Access-Control-Allow-Origin", "*");
        System.out.println(ResponseEntity.ok().header("Access-Control-Allow-Origin", "*").body(false));
        System.out.println("authenticationApproved()");
        return ResponseEntity.ok().headers(httpHeaders).body(userService.checkIfLoginCredentialsAreCorrect(usercredentials[0], usercredentials[1]));
    }

//    @GetMapping("/login")
//    public boolean getAuthenticationStatus(){
//
//    }
}