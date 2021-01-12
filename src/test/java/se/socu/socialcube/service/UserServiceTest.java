package se.socu.socialcube.service;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import se.socu.socialcube.DTO.UserDTO;
import se.socu.socialcube.entities.Company;
import se.socu.socialcube.entities.UserSocu;
import se.socu.socialcube.entities.Usertype;
import se.socu.socialcube.repository.CompanyRepository;
import se.socu.socialcube.repository.UserRepository;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class UserServiceTest {

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CompanyRepository companyRepository;

    @BeforeEach
    void init() {
        Company company = new Company(5501010101L, "TestCompany AB");
        UserSocu userSocu1 = new UserSocu(Usertype.USER, "Anna Svensson", "anna.svensson@testcompany.com", "aOpTYjdls", "A007", "IT-avdelningen", company);
        UserSocu userSocu2 = new UserSocu(Usertype.ADMIN, "Erik Eriksson", "erik.eriksson@testcompany.com", "p56GkdoUyyy", "A008", "IT-avdelningen", company);

        Company company2 = new Company(5502020202L, "TestCompany2 AB");
        UserSocu userSocu3 = new UserSocu(Usertype.USER, "Angelina Björk", "angelina@testcompany2.com", "slkdjfSGslri", "", "Lager", company2);
        UserSocu userSocu4 = new UserSocu(Usertype.ADMIN, "Hans Ek", "hans@testcompany2.com", "lsgjSJRGlgs1", "", "Service Desk", company2);

        List<Company> companyList = Arrays.asList(company, company2);
        List<UserSocu> userSocuList = Arrays.asList(userSocu1, userSocu2, userSocu3, userSocu4);
        companyRepository.saveAll(companyList);
        userRepository.saveAll(userSocuList);
    }

    @AfterEach
    void teardown() {
        userRepository.deleteAll();
        companyRepository.deleteAll();
    }

    @Test
    void convertToUserDTOfromUserSocu() {

    }

    @Test
    void convertToUserSocuFromUserDTO() {
    }

    @Test
    void getAllUserDTOs() {
    }

    @Test
    void getAllUserDTOsForCompany() {
//        List<UserDTO> list = userService.getAllUserDTOsForCompany(5502020202L);
////        assertEquals(2, list.size());
    }

    @Test
    void saveNewUser() {
    }

    @Test
    void deleteUser() {
    }

    @Test
    void saveImage() {
    }

    @Test
    void copyDefaultPictureForNewUser() {
    }

    @Test
    void deleteProfilePicture() {
    }

    @Test
    void generatePassword() {
    }

    @Test
    void changePassword() {
    }

    @Test
    void updateUserInformation() {
    }

    @Test
    void getUserDTOById() {
    }

    @Test
    void getAttendees() {
    }

    @Test
    void getUserFromJWT() {
    }

    @Test
    void getUserIDFromJWT() {
    }

    @Test
    void checkIfLoginCredentialsAreCorrectAndGetUser() {
    }
}