package se.socu.socialcube.service;

import io.jsonwebtoken.Claims;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.AutoPopulatingList;
import org.springframework.web.multipart.MultipartFile;
import se.socu.socialcube.DTO.UserDTO;
import se.socu.socialcube.entities.Activity;
import se.socu.socialcube.entities.Company;
import se.socu.socialcube.entities.Response;
import se.socu.socialcube.entities.UserSocu;
import se.socu.socialcube.repository.ActivityRepository;
import se.socu.socialcube.security.jwt.JwtUtil;
import se.socu.socialcube.repository.CompanyRepository;
import se.socu.socialcube.repository.UserRepository;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Random;

@Service
public class UserService {


    public UserService(UserRepository userRepository, CompanyRepository companyRepository, ActivityRepository activityRepository) throws IOException {
        this.userRepository = userRepository;
        this.companyRepository = companyRepository;
        this.activityRepository = activityRepository;
        JwtUtil jwtUtil = new JwtUtil();
    }

    private UserRepository userRepository;
    private CompanyRepository companyRepository;
    private ActivityRepository activityRepository;


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

    public Response saveNewUser(UserDTO userDTO) {
        Response response = new Response();
        Optional<UserSocu> alreadyexisting = userRepository.findByEmail(userDTO.getEmail().toLowerCase());
        if (alreadyexisting.isPresent()) {
            response.setStatus("ERROR");
            response.setMessage("Mailadressen finns redan i databasen");
            System.out.println(response.getMessage());
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

    public Response saveImage(MultipartFile imagefile, Long userid) throws Exception {
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

    public void copyDefaultPictureForNewUser(long id) {
        File source = new File("client/angularclient/src/assets/ProfilePictures/default.png");
        File newFile = new File("client/angularclient/src/assets/ProfilePictures/" + id + ".png");
        try {
            Files.copy(source.toPath(), newFile.toPath());
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

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

    public String generatePassword(int length) {
        String characters = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXabcdefghijklmnopqrstuvwxyz";
        Random random = new Random();

        StringBuilder stringBuilder = new StringBuilder(length);
        for (int i = 0; i < length; i++) {
            stringBuilder.append(characters.charAt(random.nextInt(characters.length())));
        }
        return stringBuilder.toString();
    }

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

    public Response updateUserInformation(long userid, String name, String email, String department) {
        Response response = new Response();

        Optional<UserSocu> userSocu = userRepository.findById(userid);
        if (userSocu.isPresent()) {
            UserSocu user = userSocu.get();
            user.setName(name);
            user.setEmail(email);
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

    public UserDTO getUserFromJWT(String token) throws IOException {
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

    public long getUserIDFromJWT(String token) {
        Claims claims = JwtUtil.decodeJWT(token);
        return Long.parseLong(claims.getId());
    }

    public UserDTO checkIfLoginCredentialsAreCorrectAndGetUser(String username, String password) throws IOException {
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
