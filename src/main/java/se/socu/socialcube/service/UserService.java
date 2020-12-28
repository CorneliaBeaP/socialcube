package se.socu.socialcube.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import se.socu.socialcube.DTO.UserDTO;
import se.socu.socialcube.entities.Company;
import se.socu.socialcube.entities.Response;
import se.socu.socialcube.entities.UserSocu;
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

    public UserService(UserRepository userRepository, CompanyRepository companyRepository) {
        this.userRepository = userRepository;
        this.companyRepository = companyRepository;
    }

    private UserRepository userRepository;
    private CompanyRepository companyRepository;

    public UserDTO convertToUserDTOfromUserSocu(UserSocu userSocu) {
        UserDTO userDTO = new UserDTO();
        userDTO.setId(userSocu.getId());
        userDTO.setName(userSocu.getName());
        userDTO.setEmail(userSocu.getEmail());
        userDTO.setUsertype(userSocu.getUsertype());
        userDTO.setDepartment(userSocu.getDepartment());
        userDTO.setEmploymentnumber(userSocu.getEmploymentnumber());
        userDTO.setCompanyorganizationnumber(userSocu.getCompany().getOrganizationnumber());
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

    public List<UserDTO> getAllUserDTOs() {
        List<UserSocu> allUsers = (List<UserSocu>) userRepository.findAll();
        List<UserDTO> allUsersDTO = new ArrayList<>();

        for (UserSocu user : allUsers
        ) {
            UserDTO userDTO = convertToUserDTOfromUserSocu(user);
            allUsersDTO.add(userDTO);
        }
        return allUsersDTO;
    }

    public UserDTO checkIfLoginCredentialsAreCorrectAndGetUser(String username, String password) {
        UserDTO userDTO = new UserDTO();
        if (!(username == null)) {
            Optional<UserSocu> userSocu = userRepository.findByEmail(username.toLowerCase());
            if (userSocu.isPresent()) {
                if (!(userSocu.get().getEmail().length() < 1) && userSocu.get().getPassword().equals(password)) {
                    userDTO = convertToUserDTOfromUserSocu(userSocu.get());
                }
            }
        }
        return userDTO;
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

    public UserSocu saveNewUser(UserDTO userDTO) {
        UserSocu userSocu = convertToUserSocuFromUserDTO(userDTO);
        userSocu.setEmail(userSocu.getEmail().toLowerCase());
        userSocu.setPassword(generatePassword(11));
        System.out.println(userSocu.getPassword());
        userRepository.save(userSocu);
        Optional<UserSocu> userSocu1 = userRepository.findByEmail(userDTO.getEmail());
        userSocu1.ifPresent(socu -> copyDefaultPictureForNewUser(socu.getId()));
        return userSocu;
    }

    public void deleteUser(Long id) {
        Optional<UserSocu> userSocu = userRepository.findById(id);
        if (userSocu.isPresent()) {
            userRepository.delete(userSocu.get());
        }
    }

    public void saveImage(MultipartFile imagefile, Long userid) throws Exception {
        String folder = "C:\\Users\\corne\\OneDrive\\Dokument\\SocialCube\\Kod\\IntelliJ\\client\\angularclient\\src\\assets\\ProfilePictures\\";
        byte[] bytes = imagefile.getBytes();
        String fileName = userid.toString();
        Path path = Paths.get(folder + fileName + ".png");
        try {
            Files.write(path, bytes);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public void copyDefaultPictureForNewUser(long id) {
        File source = new File("C:\\Users\\corne\\OneDrive\\Dokument\\SocialCube\\Kod\\IntelliJ\\client\\angularclient\\src\\assets\\ProfilePictures\\default.png");
        File newFile = new File("C:\\Users\\corne\\OneDrive\\Dokument\\SocialCube\\Kod\\IntelliJ\\client\\angularclient\\src\\assets\\ProfilePictures\\" + id + ".png");
        try {
            Files.copy(source.toPath(), newFile.toPath());
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public void deleteProfilePicture(Long id) {
        String folder = "C:\\Users\\corne\\OneDrive\\Dokument\\SocialCube\\Kod\\IntelliJ\\client\\angularclient\\src\\assets\\ProfilePictures\\";
        String fileName = id.toString() + ".png";
        Path path = Paths.get(folder + fileName);
        try {
            Files.deleteIfExists(path);
            copyDefaultPictureForNewUser(id);
        } catch (IOException e) {
            e.printStackTrace();
        }
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
        Response response = new Response();
        Optional<UserSocu> userSocu = userRepository.findById(userid);
        if (userSocu.isPresent()) {
            if (userSocu.get().getPassword().equals(oldpass)) {
                userSocu.get().setPassword(newpass);
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

    public UserDTO getUserDTOById(long id) {
        UserDTO dto = new UserDTO();
        Optional<UserSocu> userSocu = userRepository.findById(id);
        if (userSocu.isPresent()) {
            dto = convertToUserDTOfromUserSocu(userSocu.get());
        }
        return dto;
    }

    public ArrayList<UserDTO> getAttendees(long activityid) {
        ArrayList<UserSocu> usersocus = userRepository.findAllAttendeesByActivityId(activityid);
        ArrayList<UserDTO> userDTOS = new ArrayList<>();
        for (UserSocu u : usersocus
        ) {
            userDTOS.add(convertToUserDTOfromUserSocu(u));
            System.out.println(u.toString());
        }


        return userDTOS;
    }
}
