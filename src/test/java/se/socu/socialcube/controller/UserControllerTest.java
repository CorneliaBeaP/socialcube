package se.socu.socialcube.controller;

import io.jsonwebtoken.Claims;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Repository;
import se.socu.socialcube.DTO.UserDTO;
import se.socu.socialcube.entities.Company;
import se.socu.socialcube.entities.Response;
import se.socu.socialcube.entities.UserSocu;
import se.socu.socialcube.entities.Usertype;
import se.socu.socialcube.repository.CompanyRepository;
import se.socu.socialcube.repository.UserRepository;
import se.socu.socialcube.security.jwt.JwtUtil;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class UserControllerTest {

    @Autowired
    CompanyRepository companyRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    UserController userController;

    UserDTO dto;

    private Optional<UserSocu> optionalUserSocu;

    @BeforeEach
    void setUp() {
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        Company company = new Company(5501010101L, "TestCompany AB");
        UserSocu socuuser = new UserSocu(Usertype.USER, "Anna Svensson", "anna.svensson@testcompany.com", passwordEncoder.encode("aOpTYjdls"), "A007", "IT-avdelningen", company);
        socuuser.setId(1L);
        UserSocu socuuser2 = new UserSocu(Usertype.ADMIN, "Erik Eriksson", "erik.eriksson@testcompany.com", passwordEncoder.encode("p56GkdoUyyy"), "A008", "IT-avdelningen", company);
        socuuser2.setId(2L);

        dto = new UserDTO();
        dto.setUsertype(Usertype.USER);
        dto.setName("Caroline Canvas");
        dto.setEmail("caroline.canvas@company.com");
        dto.setEmploymentnumber("U4756");
        dto.setDepartment("Lager");
        dto.setCompanyname(company.getName());
        dto.setCompanyorganizationnumber(company.getOrganizationnumber());

        companyRepository.save(company);
        userRepository.save(socuuser);
        userRepository.save(socuuser2);

        optionalUserSocu = userRepository.findByEmail("anna.svensson@testcompany.com");
    }

    @AfterEach
    void tearDown() throws IOException {
        userRepository.deleteAll();
        companyRepository.deleteAll();
        String folder = "client/angularclient/src/assets/ProfilePictures/";
        for (int i = 1; i < 200; i++) {
            String fileName = i + ".png";
            Path path = Paths.get(folder + fileName);
            Files.deleteIfExists(path);
        }
    }

    @Test
    void getUsersForCompany() {
        List<UserDTO> userDTOS = userController.getUsersForCompany(5501010101L);
        assertNotNull(userDTOS);
        assertEquals(2, userDTOS.size());
    }

    @Test
    void saveNewUser() {
        Response response = userController.saveNewUser(dto);
        assertNotNull(response.getStatus());
        assertEquals("OK", response.getStatus());
        assertNotNull(response.getMessage());
    }

    @Test
    void deleteUser() {
        Response response = userController.deleteUser(optionalUserSocu.get().getId());
        assertNotNull(response.getStatus());
        assertEquals("OK", response.getStatus());
    }

    @Test
    void changePassword() {
        UserSocu userSocu = optionalUserSocu.get();
        String token = JwtUtil.createJWT(String.valueOf(userSocu.getId()), String.valueOf(userSocu.getId()), userSocu.getName());
        String[] userinfo = {"aOpTYjdls", "111"};
        Response response = userController.changePassword(token, userinfo);
        assertNotNull(response.getStatus());
        assertEquals("OK", response.getStatus());
    }

    @Test
    void updateUserInformation() {
        UserSocu userSocu = optionalUserSocu.get();
        String token = JwtUtil.createJWT(String.valueOf(userSocu.getId()), String.valueOf(userSocu.getId()), userSocu.getName());
        String[] info = {"Anna Hansson", userSocu.getEmail(), userSocu.getDepartment()};
        Response response = userController.updateUserInformation(token, info);
        assertNotNull(response.getStatus());
        assertEquals("OK", response.getStatus());
        String[] infoalreadyexists = {"Anna Hansson", "erik.eriksson@testcompany.com", userSocu.getDepartment()};
        response = userController.updateUserInformation(token, infoalreadyexists);
        assertNotNull(response.getStatus());
        assertEquals("ERROR", response.getStatus());
    }

    @Test
    void verifyCredentialsAndSendToken() throws IOException {
        UserSocu userSocu = optionalUserSocu.get();
        String[] usercredentials = {userSocu.getEmail(), "aOpTYjdls"};
        UserDTO userDTO = userController.verifyCredentialsAndSendToken(usercredentials);
        Claims claims = JwtUtil.decodeJWT(userDTO.getToken());

        assertNotNull(userDTO.getName());
        assertEquals("Anna Svensson", userDTO.getName());
        assertNotNull(userDTO.getToken());
        assertNotNull(claims.getSubject());
        assertEquals("Anna Svensson", claims.getSubject());

        String[] wrongusercredentials = {"anna.svensson@testcompany.co", "aOpTYjdls"};
        userDTO = userController.verifyCredentialsAndSendToken(wrongusercredentials);

        assertNull(userDTO.getName());
        assertNull(userDTO.getToken());
    }

    @Test
    void getUserDTOFromJWT() throws IOException {
        UserSocu userSocu = optionalUserSocu.get();
        String token = JwtUtil.createJWT(String.valueOf(userSocu.getId()), String.valueOf(userSocu.getId()), userSocu.getName());
        UserDTO userDTO = userController.getUserDTOFromJWT(token);

        assertNotNull(userDTO.getName());
        assertEquals("Anna Svensson", userDTO.getName());
    }

    @Test
    void getUserIDfromJWT() {
        UserSocu userSocu = optionalUserSocu.get();
        String token = JwtUtil.createJWT(String.valueOf(userSocu.getId()), String.valueOf(userSocu.getId()), userSocu.getName());
        Response response = userController.getUserIDfromJWT(token);

        assertNotNull(response.getStatus());
        assertEquals("OK", response.getStatus());
        assertEquals(String.valueOf(userSocu.getId()), response.getMessage());
    }
}