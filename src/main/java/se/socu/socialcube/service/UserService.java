package se.socu.socialcube.service;

import org.apache.catalina.User;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.logging.LoggerGroup;
import org.springframework.stereotype.Service;
import se.socu.socialcube.DTO.UserDTO;
import se.socu.socialcube.entities.UserSocu;
import se.socu.socialcube.repository.UserRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

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
            Optional<UserSocu> userSocu = userRepository.findByEmail(username);
            if(userSocu.isPresent()){
                if (!(userSocu.get().getEmail().length()<1) && userSocu.get().getPassword().equals(password)) {
                    userDTO = convertToUserDTOfromUserSocu(userSocu.get());
                }
            }
        }
        return userDTO;
    }
}