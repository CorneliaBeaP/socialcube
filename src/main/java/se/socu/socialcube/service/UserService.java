package se.socu.socialcube.service;

import io.jsonwebtoken.Claims;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import se.socu.socialcube.DTO.UserDTO;
import se.socu.socialcube.entities.Activity;
import se.socu.socialcube.entities.Company;
import se.socu.socialcube.entities.Response;
import se.socu.socialcube.entities.UserSocu;
import se.socu.socialcube.repository.ActivityRepository;
import se.socu.socialcube.repository.CompanyRepository;
import se.socu.socialcube.repository.UserRepository;
import se.socu.socialcube.security.jwt.JwtUtil;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Random;

/**
 * A service that communicates with the repository regarding things about users, which in it's turn communicates with the database.
 */
@Service
public class UserService {


    /**
     * Constructor for the UserService
     * @param userRepository a repository that communicates with the database regarding things about users
     * @param companyRepository a repository that communicates with the database regarding things about companies
     * @param activityRepository a repository that communicates with the database regarding things about activities
     * @throws IOException
     */
    public UserService(UserRepository userRepository, CompanyRepository companyRepository, ActivityRepository activityRepository) throws IOException {
        this.userRepository = userRepository;
        this.companyRepository = companyRepository;
        this.activityRepository = activityRepository;
        JwtUtil jwtUtil = new JwtUtil();
    }

    /**
     * a repository that communicates with the database regarding things about users
     */
    private UserRepository userRepository;

    /**
     * a repository that communicates with the database regarding things about companies
     */
    private CompanyRepository companyRepository;

    /**
     * a repository that communicates with the database regarding things about activities
     */
    private ActivityRepository activityRepository;

    /**
     * Converts an instance of UserSocu-object to UserDTO
     * @param userSocu the UserSocu that is to be converted
     * @return an UserDTO which the same information as the user-object provided
     */
    public UserDTO convertToUserDTOfromUserSocu(UserSocu userSocu) {
        UserDTO userDTO = new UserDTO();
        userDTO.setId(userSocu.getId());
        userDTO.setName(userSocu.getName());
        userDTO.setEmail(userSocu.getEmail());
        userDTO.setUsertype(userSocu.getUsertype());
        userDTO.setDepartment(userSocu.getDepartment());
        userDTO.setEmploymentnumber(userSocu.getEmploymentnumber());
        userDTO.setCompanyorganizationnumber(userSocu.getCompany().getOrganizationnumber());
        userDTO.setCompanyname(userSocu.getCompany().getName());
        return userDTO;
    }

    /**
     * Converts an instance of UserDTO to an UserSocu-object
     * @param userDTO the UserDTO that is to be converted
     * @return an UserSocu-object with the same information as the provided UserDTO
     */
    public UserSocu convertToUserSocuFromUserDTO(UserDTO userDTO) {
        UserSocu userSocu = new UserSocu();
        userSocu.setName(userDTO.getName());
        userSocu.setEmail(userDTO.getEmail());
        userSocu.setUsertype(userDTO.getUsertype());
        userSocu.setDepartment(userDTO.getDepartment());
        userSocu.setEmploymentnumber(userDTO.getEmploymentnumber());
        Optional<Company> company = companyRepository.findById(userDTO.getCompanyorganizationnumber());
        if (company.isPresent()) {
            userSocu.setCompany(company.get());
        }
        return userSocu;
    }

    /**
     * Provides all the users registered to a specific company
     * @param id the companys id/organization number
     * @return a list of all users registered to the company, as UserDTOs
     */
    public List<UserDTO> getAllUserDTOsForCompany(Long id) {
        List<UserSocu> allUsers = (List<UserSocu>) userRepository.findAllByCompany_organizationnumber(id);
        List<UserDTO> allUsersDTO = new ArrayList<>();

        for (UserSocu user : allUsers
        ) {
            UserDTO userDTO = convertToUserDTOfromUserSocu(user);
            allUsersDTO.add(userDTO);
        }
        return allUsersDTO;
    }

    /**
     * Saves a new user to the database
     * @param userDTO an UserDTO with the information about the new user
     * @return a response with information about if the user was saved or not
     */
    public Response saveNewUser(UserDTO userDTO) {
        Response response = new Response();
        Optional<UserSocu> alreadyexisting = userRepository.findByEmail(userDTO.getEmail().toLowerCase());
        if (alreadyexisting.isPresent()) {
            response.setStatus("ERROR");
            response.setMessage("Mailadressen finns redan i databasen");
        } else {
            BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
            UserSocu userSocu = convertToUserSocuFromUserDTO(userDTO);
            userSocu.setEmail(userSocu.getEmail().toLowerCase());
            String password = generatePassword(11);
            userSocu.setPassword(passwordEncoder.encode(password));
            try {
                userRepository.save(userSocu);
                response.setStatus("OK");
                response.setMessage(password);
            } catch (Exception e) {
                e.printStackTrace();
                response.setStatus("ERROR");
                response.setMessage("Kunde inte lägga till användare");
            }
            Optional<UserSocu> userSocu1 = userRepository.findByEmail(userDTO.getEmail());
            userSocu1.ifPresent(socu -> copyDefaultPictureForNewUser(socu.getId()));
        }
        return response;
    }

    /**
     * Deletes a user
     * @param id the id of the user
     * @return a response with information if the user was deleted or not
     */
    public Response deleteUser(Long id) {
        Response response = new Response();
        Optional<UserSocu> userSocu = userRepository.findById(id);
        if (userSocu.isPresent()) {
            List<Activity> emptylist = new ArrayList<>();
            List<Activity> attendedActivities = activityRepository.findAllAttendedActivitiesByUsersocuId(userSocu.get().getId());
            for (Activity a : attendedActivities
            ) {
                userSocu.get().setAttendedactivities(emptylist);
                List<UserSocu> attendees = userRepository.findAllAttendeesByActivityId(a.getId());
                attendees.removeIf(u -> u.getId() == userSocu.get().getId());
                a.setAttendees(attendees);
                userRepository.save(userSocu.get());
                activityRepository.save(a);
            }
            List<Activity> declinedActivities = activityRepository.findAllDeclinedActivitiesByUsersocuId(userSocu.get().getId());
            for (Activity a : declinedActivities
            ) {
                userSocu.get().setDeclinedactivities(emptylist);
                List<UserSocu> decliners = userRepository.findAllDeclinersByActivityId(a.getId());
                decliners.removeIf(u -> u.getId() == userSocu.get().getId());
                a.setDecliners(decliners);
                userRepository.save(userSocu.get());
                activityRepository.save(a);
            }
            List<Activity> createdActivities = activityRepository.findAllByCreatedby(userSocu.get());
            for (Activity a : createdActivities
            ) {
                userSocu.get().setCreatedactivities(emptylist);
                a.setCreatedby(null);
                activityRepository.save(a);
                userRepository.save(userSocu.get());
            }
            try {
                userRepository.delete(userSocu.get());
                deleteProfilePicture(id, true);
                response.setStatus("OK");
                response.setMessage("Användare borttagen");
            } catch (Exception e) {
                e.printStackTrace();
                response.setStatus("ERROR");
                response.setMessage("Användare kunde inte raderas");
            }
        } else {
            response.setStatus("ERROR");
            response.setMessage("Kunde int hitta användare");
        }
        return response;
    }

    /**
     * Saves a profilepicture for an user
     * @param imagefile the profilepicture the user uploaded
     * @param userid the id of the user
     * @return a response with information about if the image was successfully saved or not
     */
    public Response saveImage(MultipartFile imagefile, Long userid) {
        Response response = new Response();
        try {
            String folder = "client/angularclient/src/assets/ProfilePictures/";
            byte[] bytes = imagefile.getBytes();
            String fileName = userid.toString();
            Path path = Paths.get(folder + fileName + ".png");
            Files.write(path, bytes);
            response.setStatus("OK");
            response.setMessage("Bild sparad");
        } catch (Exception e) {
            e.printStackTrace();
            response.setStatus("ERROR");
            response.setMessage("Kunde inte spara bild");
        }
        return response;
    }

    /**
     * Creates a new image when a new user is created. The image name is the new users id and shows the default picture
     * @param id the new users id
     */
    public void copyDefaultPictureForNewUser(long id) {
        File source = new File("client/angularclient/src/assets/ProfilePictures/default.png");
        File newFile = new File("client/angularclient/src/assets/ProfilePictures/" + id + ".png");
        try {
            Files.copy(source.toPath(), newFile.toPath());
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    /**
     * Replaces an users profile picture-file with the default profile picture or deletes the image completely in the case that the user is being deleted as well
     * @param id the users id
     * @param isUserRemoved boolean if the user is being deleted as well
     * @return response with information about if the action was successful or not
     */
    public Response deleteProfilePicture(Long id, Boolean isUserRemoved) {
        Response response = new Response();
        String folder = "client/angularclient/src/assets/ProfilePictures/";
        String fileName = id.toString() + ".png";
        Path path = Paths.get(folder + fileName);
        try {
            Files.deleteIfExists(path);
            response.setStatus("OK");
            response.setMessage("Bild borttagen");
            if (!isUserRemoved) {
                copyDefaultPictureForNewUser(id);
            }
        } catch (IOException e) {
            e.printStackTrace();
            response.setStatus("ERROR");
            response.setMessage("Kunde inte ta bort bild");
        }
        return response;
    }

    /**
     * Generates a password with randomly selected numbers and letters
     * @param length the length of which the password should be
     * @return a randomly generated password
     */
    public String generatePassword(int length) {
        String characters = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXabcdefghijklmnopqrstuvwxyz";
        Random random = new Random();

        StringBuilder stringBuilder = new StringBuilder(length);
        for (int i = 0; i < length; i++) {
            stringBuilder.append(characters.charAt(random.nextInt(characters.length())));
        }
        return stringBuilder.toString();
    }

    /**
     * Changes an users password
     * @param oldpass the users old password
     * @param newpass the new password the user want to change to
     * @param userid the id of the user
     * @return a response with information if the change was successful or not
     */
    public Response changePassword(String oldpass, String newpass, Long userid) {
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        Response response = new Response();
        Optional<UserSocu> userSocu = userRepository.findById(userid);
        if (userSocu.isPresent()) {
            if (passwordEncoder.matches(oldpass, userSocu.get().getPassword())) {
                userSocu.get().setPassword(passwordEncoder.encode(newpass));
                userRepository.save(userSocu.get());
                response.setStatus("OK");
                response.setMessage("Lösenord ändrat!");
            } else {
                response.setStatus("ERROR");
                response.setMessage("Gammalt lösenord ej godkänt.");
            }
        } else {
            response.setStatus("ERROR");
            response.setMessage("Kan inte hitta användare");
        }
        return response;
    }

    /**
     * Updates userinformation in the database such as name, email and/or deparment.
     * @param userid the id of the user
     * @param name the users name
     * @param email the users email
     * @param department the users deparment, if there is any, otherwise empty
     * @return a response with information if the update was successful or not
     */
    public Response updateUserInformation(long userid, String name, String email, String department) {
        Response response = new Response();
        Optional<UserSocu> userSocu = userRepository.findById(userid);
        Optional<UserSocu> emailcheck = userRepository.findByEmail(email);
        if (userSocu.isPresent()) {
            UserSocu user = userSocu.get();
            if (emailcheck.isPresent() && !(emailcheck.get().getId() == user.getId())) {
                    response.setStatus("ERROR");
                    response.setMessage("Kunde inte uppdatera informationen. Mailadressen är redan registrerad till en annan användare.");
            } else {
                user.setEmail(email);
                user.setName(name);
                user.setDepartment(department);
                try {
                    userRepository.save(user);
                    response.setMessage("Informationen uppdaterad!");
                    response.setStatus("OK");
                } catch (Exception e) {
                    e.printStackTrace();
                    response.setMessage("Kunde inte uppdatera informationen. Försök igen senare.");
                    response.setStatus("ERROR");
                }
            }

        } else {
            response.setMessage("Kunde inte uppdatera informationen. Försök igen senare.");
            response.setStatus("ERROR");
        }
        return response;
    }

    public ArrayList<UserDTO> getAttendees(long activityid) {
        ArrayList<UserSocu> usersocus = userRepository.findAllAttendeesByActivityId(activityid);
        ArrayList<UserDTO> userDTOS = new ArrayList<>();
        for (UserSocu u : usersocus
        ) {
            userDTOS.add(convertToUserDTOfromUserSocu(u));
        }
        return userDTOS;
    }

    /**
     * Get the logged in user by decoding the Jason Web Token provided by the client
     * @param token the Jason Web Token provided by the client
     * @return an User Data Transfer Object of the user that is logged in
     */
    public UserDTO getUserFromJWT(String token){
        JwtUtil.decodeJWT(token);
        Claims claims = JwtUtil.decodeJWT(token);
        UserDTO dto = new UserDTO();
        if (!claims.getId().isEmpty()) {
            Optional<UserSocu> userSocu = userRepository.findById(Long.parseLong(claims.getId()));
            if (userSocu.isPresent()) {
                dto = convertToUserDTOfromUserSocu(userSocu.get());
                dto.setToken(token);
            }
        }
        return dto;
    }

    /**
     * Get a userID for the logged in user from a JSON Web Token provided by the client
     * @param token the Jason Web Token provided by the client
     * @return the ID for the user that is logged in
     */
    public long getUserIDFromJWT(String token) {
        Claims claims = JwtUtil.decodeJWT(token);
        return Long.parseLong(claims.getId());
    }

    /**
     * Check if the username and password provided are correct for an user and existing in the database
     * @param username the username provided when logging in
     * @param password the password provided when logging in
     * @return an empty UserDTO if the login credentials are wrong, or an UserDTO of an user if the login credentials are right
     */
    public UserDTO checkIfLoginCredentialsAreCorrectAndGetUser(String username, String password) {
        UserDTO userDTO = new UserDTO();
        BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
        if (!(username == null)) {
            Optional<UserSocu> userSocu = userRepository.findByEmail(username.toLowerCase());
            if (userSocu.isPresent()) {
                if (!(userSocu.get().getEmail().length() < 1) && bCryptPasswordEncoder.matches(password, userSocu.get().getPassword())) {
                    userDTO = convertToUserDTOfromUserSocu(userSocu.get());
                    userDTO.setToken(JwtUtil.createJWT(String.valueOf(userSocu.get().getId()), String.valueOf(userSocu.get().getId()), userSocu.get().getName()));
                }
            }
        }
        return userDTO;
    }
}
