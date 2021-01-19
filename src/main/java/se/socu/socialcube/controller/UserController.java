package se.socu.socialcube.controller;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import se.socu.socialcube.DTO.UserDTO;
import se.socu.socialcube.entities.Response;
import se.socu.socialcube.service.UserService;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;

@CrossOrigin(origins = "http://localhost:4200", allowedHeaders = "*")
@RestController
public class UserController {

    public UserController(UserService userService) {
        this.userService = userService;
    }

    /**
     * A service used to communicate with the repository which in turn communicates with the database
     */
    private final UserService userService;

    /**
     * Provides all the users registered to a specific company
     * @param id the companys id/organization number
     * @return a list of all users registered to the company, as UserDTOs
     */
    @GetMapping("/api/users/{id}")
    public List<UserDTO> getUsersForCompany(@PathVariable Long id) {
        return userService.getAllUserDTOsForCompany(id);
    }

    /**
     * Gets information about a new user by the client and sends it to the UserService to save in the database
     * @param userDTO an UserDTO with the information about the new user
     * @return a response with information about if the user was saved or not
     */
    @PostMapping(path = "/api/users/add", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
    public Response saveNewUser(@RequestBody UserDTO userDTO) {
        return userService.saveNewUser(userDTO);
    }

    /**
     * Gets information from the client about an user that is to be deleted and forward the information to the UserService
     * @param id the id of the user
     * @return a response about if the action to delete the user was successful or not
     */
    @DeleteMapping("/api/users/delete/{id}")
    public Response deleteUser(@PathVariable Long id) {
        return userService.deleteUser(id);
    }

    /**
     * Gets a multipartfile from the client that a user has set as their profile picture and forward it to the UserService where the image is saved to the database
     * @param multipartFile the file with the profile picture image
     * @param id the id of the user
     * @return a response with information about if the image was saved successfully or not
     */
    @PostMapping(value = "/api/users/add/image/{id}")
    public Response addProfilePicture(@RequestParam("name") MultipartFile multipartFile, @PathVariable Long id){
        return userService.saveImage(multipartFile, id);
    }

    /**
     * Get information from the client about that a user wants to remove their profile picture and forwards that information to the UserService
     * @param id the id of the user
     * @return a response with information about if the image was removed successfully or not
     */
    @GetMapping("/api/users/delete/image/{id}")
    public Response deleteProfilePicture(@PathVariable Long id) {
        return userService.deleteProfilePicture(id, false);
    }

    /**
     * Gets information from the client that a user wants to change their password and forwards it to the UserService
     * @param token the JWT that is connected to the user that is sending the request
     * @param passwordinfo an array that first contains the users old password, then their new password
     * @return a response with information about if the password was updated or if there were errors
     */
    @PutMapping(value = "/api/users/password/{token}", consumes = MediaType.APPLICATION_JSON_VALUE)
    public Response changePassword(@PathVariable String token, @RequestBody String[] passwordinfo) {
        return userService.changePassword(passwordinfo[0], passwordinfo[1], userService.getUserIDFromJWT(token));
    }

    /**
     * Gets information from the client about a user having new user information, such as name, email and/or department and forwards it to the UserService.
     * @param token the JWT that is connected to the user that is sending the request
     * @param userinfo the information about the users name, email and department regardless if all or just one or two has been changed
     * @return a response with information about if the user information was updated in the database successfully or if there were errors preventing this
     */
    @PutMapping(value = "/api/users/update/{token}")
    public Response updateUserInformation(@PathVariable String token, @RequestBody String[] userinfo) {
        return userService.updateUserInformation(userService.getUserIDFromJWT(token), userinfo[0], userinfo[1], userinfo[2]);
    }

    /**
     * Gets information from the client when an user is trying to login and forwards it to the UserService.
     * @param usercredentials an array that contains username and password in that order
     * @return an empty UserDTO if the username/password is incorrect, or the UserDTO for the logged in user if the username/password is correct which also contains a Jason Web Token used for future communication between client and backend
     */
    @PostMapping(path = "/api/login", produces = MediaType.APPLICATION_JSON_VALUE)
    public UserDTO verifyCredentialsAndSendToken(@RequestBody String[] usercredentials){
        return userService.checkIfLoginCredentialsAreCorrectAndGetUser(usercredentials[0], usercredentials[1]);
    }

    /**
     * Gets a JWT from the client that is forwarded to the UserService to be decoded.
     * @param token the JWT that is connected to the user that is sending the request
     * @return an UserDTO with information about the user who is logged in and who sent the request
     */
    @GetMapping(value = "/api/user/{token}")
    public UserDTO getUserDTOFromJWT(@PathVariable String token){
        return userService.getUserFromJWT(token);
    }
}