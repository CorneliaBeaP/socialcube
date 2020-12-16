package se.socu.socialcube.controller;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import se.socu.socialcube.DTO.UserDTO;
import se.socu.socialcube.entities.Response;
import se.socu.socialcube.service.UserService;

import java.awt.*;
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


//    @GetMapping("/user/{id}")
//    public UserDTO getUser(@PathVariable long id) {
//        return userRepository.findById(id);
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

    @PostMapping(path = "/api/users/add", produces = MediaType.APPLICATION_JSON_VALUE)
    public Response saveNewUser(@RequestBody UserDTO userDTO) {
        System.out.println("Mottagit ny användare");
        userService.saveNewUser(userDTO);
        Response response = new Response();
        response.setStatus("OK");
        response.setMessage("111");
        return response;
    }

    @DeleteMapping("/api/users/delete/{id}")
    public Response deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        System.out.println("Användare borttagen");
        return new Response("OK", "Användare borttagen");
    }

    @PostMapping(value = "/api/users/add/image/{id}")
    public Response addProfilePicture(@RequestParam("name") MultipartFile multipartFile, @PathVariable Long id) {
        try {
            userService.saveImage(multipartFile, id);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new Response("OK", "Bild mottagen");
    }

    @GetMapping("/api/users/{id}/image")
    public Response getProfilePicture(@PathVariable Long id){
       return new Response("OK", "C:\\Users\\corne\\OneDrive\\Dokument\\SocialCube\\Kod\\ProfilePictures\\4.png");
    }
}