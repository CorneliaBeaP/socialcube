package se.socu.socialcube.controller;

import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import se.socu.socialcube.DTO.ActivityDTO;
import se.socu.socialcube.DTO.UserDTO;
import se.socu.socialcube.service.ActivityService;
import se.socu.socialcube.service.UserService;

import java.util.List;
//TODO: varför fungerar login trots felaktiga uppgifter nedan?
//@CrossOrigin(origins = "http://localhost/3000", allowedHeaders = "*")
@RestController
public class UserController {

    public UserController(UserService userService, ActivityService activityService) {
        this.userService = userService;
        this.activityService = activityService;
    }

    private final UserService userService;
    private final ActivityService activityService;

//    @RequestMapping(value = "/users", method = RequestMethod.GET)
//    public List<UserDTO> getUsers() {
//        return userService.getAllUserDTOs();
//    }


//    @GetMapping("/user/{id}")
//    public UserDTO getUser(@PathVariable long id) {
//        return userRepository.findById(id);
//    }

//    @RequestMapping(value = "/login", method = RequestMethod.POST, produces = MediaType.TEXT_PLAIN_VALUE)
//    @ResponseBody
//    public ResponseEntity<Boolean> checkAuthenticationStatus(@RequestParam String[] usercredentials) {
//        HttpHeaders httpHeaders = new HttpHeaders();
//        httpHeaders.set("Access-Control-Allow-Origin", "*");
//        System.out.println(ResponseEntity.ok().header("Access-Control-Allow-Origin", "*").body(false));
//        System.out.println("authenticationApproved()");
//        return ResponseEntity.ok().headers(httpHeaders).body(userService.checkIfLoginCredentialsAreCorrect(usercredentials[0], usercredentials[1]));
//    }

    @PostMapping(path = "/api/login", produces = MediaType.APPLICATION_JSON_VALUE)
    public UserDTO getAuthenticationStatus(@RequestBody String[] usercredentials) {
//        System.out.println("usercredentials: " + usercredentials[0] + ", " + usercredentials[1] + " userDTO: " + userService.checkIfLoginCredentialsAreCorrectAndGetUser(usercredentials[0], usercredentials[1]));
        UserDTO userDTO = userService.checkIfLoginCredentialsAreCorrectAndGetUser(usercredentials[0], usercredentials[1]);
        System.out.println(userDTO.getEmail() + " email");
        if (!(userDTO.getEmail() == null)) {
            return userDTO;
        } else {
            return null;
        }
    }

//    @PostMapping(path = "/home", produces = MediaType.APPLICATION_JSON_VALUE)
//    public String saveActivity(@RequestBody String usercredentials) {
//        System.out.println(usercredentials);
//        return usercredentials;
//    }
}