package se.socu.socialcube.service;

import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.logging.LoggerGroup;
import org.springframework.stereotype.Service;
import se.socu.socialcube.DTO.UserDTO;
import se.socu.socialcube.entities.UserSocu;
import se.socu.socialcube.repository.UserRepository;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public UserDTO convertToUserDTOfromUserSocu(UserSocu userSocu) {
        UserDTO userDTO = new UserDTO();
        userDTO.setId(userSocu.getId());
        userDTO.setName(userSocu.getName());
        userDTO.setEmail(userSocu.getEmail());
        userDTO.setPassword(userSocu.getPassword());
        userDTO.setUsertype(userSocu.getUsertype());
        userDTO.setDepartment(userSocu.getDepartment());
        userDTO.setEmploymentnumber(userSocu.getEmploymentnumber());
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

    public boolean checkIfLoginCredentialsAreCorrect(String username, String password) {
        boolean isAuthenticated = false;
//
//        if(!(username ==null)){
//            UserSocu userSocu= userRepository.findByEmail(username;
//            System.out.println(u);
////            if(userRepository.findByEmail(username).getPassword().equals(password)){
////                isAuthenticated = true;
////            }
//        }
        System.out.println(username);
        System.out.println(password);
        System.out.println(isAuthenticated);
        return isAuthenticated;
    }
}
