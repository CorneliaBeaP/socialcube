package se.socu.socialcube.controller;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import se.socu.socialcube.DTO.UserDTO;
import se.socu.socialcube.entities.Response;
import se.socu.socialcube.entities.UserSocu;
import se.socu.socialcube.service.UserService;

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
        System.out.println("Skickar användare...");
        return userService.getAllUserDTOsForCompany(id);
    }

    @PostMapping(path = "/api/login", produces = MediaType.APPLICATION_JSON_VALUE)
    public UserDTO getAuthenticationStatus(@RequestBody String[] usercredentials) {
        UserDTO userDTO = userService.checkIfLoginCredentialsAreCorrectAndGetUser(usercredentials[0], usercredentials[1]);
        System.out.println(userDTO.getEmail() + " email");
        if (!(userDTO.getEmail() == null)) {
            return userDTO;
        } else {
            return null;
        }
    }

    @PostMapping(path = "/api/users/add", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
    public Response saveNewUser(@RequestBody UserDTO userDTO) {
        System.out.println("Mottagit ny användare");
        UserSocu userSocu = userService.saveNewUser(userDTO);
        Response response = new Response();
        response.setStatus("OK");
        response.setMessage(userSocu.getPassword());
        return response;
    }

    @DeleteMapping("/api/users/delete/{id}")
    public Response deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        System.out.println("Användare borttagen");
        return new Response("OK", "Anrop mottaget");
    }

    @PostMapping(value = "/api/users/add/image/{id}")
    public Response addProfilePicture(@RequestParam("name") MultipartFile multipartFile, @PathVariable Long id) {
        try {
            userService.saveImage(multipartFile, id);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new Response("OK", "Anrop mottaget");
    }

    @GetMapping("/api/users/delete/image/{id}")
    public Response deleteProfilePicture(@PathVariable Long id) {
        System.out.println("Mottagit anrop om att ta bort bild");
        userService.deleteProfilePicture(id, false);
        return new Response("OK", "Anrop mottaget");
    }

    @PutMapping(value = "/api/users/password/{id}", consumes = MediaType.APPLICATION_JSON_VALUE)
    public Response changePassword(@PathVariable Long id, @RequestBody String[] passwordinfo) {
        return userService.changePassword(passwordinfo[0], passwordinfo[1], id);
    }

    @PutMapping(value = "/api/users/update/{id}")
    public Response updateUserInformation(@PathVariable long id, @RequestBody String[] userinfo) {
        return userService.updateUserInformation(id, userinfo[0], userinfo[1], userinfo[2]);
    }

    @GetMapping(value = "/api/user/{id}")
    public UserDTO getUser(@PathVariable long id) {
        return userService.getUserDTOById(id);
    }
}