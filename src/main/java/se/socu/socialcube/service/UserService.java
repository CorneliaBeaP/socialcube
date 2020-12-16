package se.socu.socialcube.service;

import org.apache.catalina.User;
import org.apache.tomcat.util.http.fileupload.FileUtils;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.logging.LoggerGroup;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import se.socu.socialcube.DTO.UserDTO;
import se.socu.socialcube.entities.Company;
import se.socu.socialcube.entities.UserSocu;
import se.socu.socialcube.repository.CompanyRepository;
import se.socu.socialcube.repository.UserRepository;

import javax.imageio.ImageIO;
import java.awt.*;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

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

    public void saveNewUser(UserDTO userDTO) {
        UserSocu userSocu = convertToUserSocuFromUserDTO(userDTO);
        userSocu.setPassword("111");
        userRepository.save(userSocu);
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

//        String fileend = "";
//        if (Objects.requireNonNull(imagefile.getOriginalFilename()).endsWith(".png")) {
//            fileend = ".png";
//        } else if (Objects.requireNonNull(imagefile.getOriginalFilename()).endsWith(".jpg")) {
//            fileend = ".jpg";
//        } else if (Objects.requireNonNull(imagefile.getOriginalFilename()).endsWith(".gif")) {
//            fileend = ".gif";
//        }
        Path path = Paths.get(folder + fileName + ".png");
        try {
            Files.write(path, bytes);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public void deleteProfilePicture(Long id) {
        String folder = "C:\\Users\\corne\\OneDrive\\Dokument\\SocialCube\\Kod\\IntelliJ\\client\\angularclient\\src\\assets\\ProfilePictures\\";
        String fileName = id.toString() + ".png";
        Path path = Paths.get(folder + fileName);
        try{
            Files.deleteIfExists(path);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
