package se.socu.socialcube.controller;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import se.socu.socialcube.DTO.UserDTO;
import se.socu.socialcube.entities.Response;
import se.socu.socialcube.entities.UserSocu;
import se.socu.socialcube.service.UserService;

import java.io.IOException;
import java.util.List;

@CrossOrigin(origins = "http://localhost:4200", allowedHeaders = "*")
@RestController
public class UserController {

    public UserController(UserService userService) {
        this.userService = userService;
    }

    private final UserService userService;

    @RequestMapping(value = "/api/users", method = RequestMethod.GET)
    public List<UserDTO> getUsers() {
        return userService.getAllUserDTOs();
    }

    @GetMapping("/api/users/{id}")
    public List<UserDTO> getUsersForCompany(@PathVariable Long id) {
        return userService.getAllUserDTOsForCompany(id);
    }

    @PostMapping(path = "/api/users/add", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
    public Response saveNewUser(@RequestBody UserDTO userDTO) {
        System.out.println("Mottagit ny användare");
        return userService.saveNewUser(userDTO);
    }

    @DeleteMapping("/api/users/delete/{id}")
    public Response deleteUser(@PathVariable Long id) {
        System.out.println("Användare med id " + id + " är borttagen.");
        return userService.deleteUser(id);
    }

    @PostMapping(value = "/api/users/add/image/{id}")
    public Response addProfilePicture(@RequestParam("name") MultipartFile multipartFile, @PathVariable Long id) throws Exception {
        return userService.saveImage(multipartFile, id);
    }

    @GetMapping("/api/users/delete/image/{id}")
    public Response deleteProfilePicture(@PathVariable Long id) {
       return userService.deleteProfilePicture(id, false);
    }

    @PutMapping(value = "/api/users/password/{token}", consumes = MediaType.APPLICATION_JSON_VALUE)
    public Response changePassword(@PathVariable String token, @RequestBody String[] passwordinfo) {
        return userService.changePassword(passwordinfo[0], passwordinfo[1], userService.getUserIDFromJWT(token));
    }

    @PutMapping(value = "/api/users/update/{token}")
    public Response updateUserInformation(@PathVariable String token, @RequestBody String[] userinfo) {
        return userService.updateUserInformation(userService.getUserIDFromJWT(token), userinfo[0], userinfo[1], userinfo[2]);
    }

    @PostMapping(path = "/api/login", produces = MediaType.APPLICATION_JSON_VALUE)
    public UserDTO verifyCredentialsAndSendToken(@RequestBody String[] usercredentials) throws IOException {
        System.out.println(userService.checkIfLoginCredentialsAreCorrectAndGetUser(usercredentials[0], usercredentials[1]).getName() + " har loggat in");
        return userService.checkIfLoginCredentialsAreCorrectAndGetUser(usercredentials[0], usercredentials[1]);
    }

    @GetMapping(value = "/api/user/{token}")
    public UserDTO getUserDTOFromJWT(@PathVariable String token) throws IOException {
        System.out.println("Info om " + userService.getUserFromJWT(token).getName() + " har skickats");
        return userService.getUserFromJWT(token);
    }

    @GetMapping(value = "/api/getuserid/{token}")
    public Response getUserIDfromJWT(@PathVariable String token) {
        Response response = new Response();
        long id = userService.getUserIDFromJWT(token);
        response.setMessage(Long.toString(id));
        if (id > 0) {
            response.setStatus("OK");
        } else {
            response.setStatus("ERROR");
        }
        return response;
    }
}