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

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class UserServiceTest {

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CompanyRepository companyRepository;

    Company company;
    Company company2;
    UserSocu userSocu1;
    UserSocu userSocu2;
    UserSocu userSocu3;
    UserSocu userSocu4;
    UserDTO userDTO;

    @BeforeEach
    void init() throws IOException {
        company = new Company(5501010101L, "TestCompany AB");
        userSocu1 = new UserSocu(Usertype.USER, "Anna Svensson", "anna.svensson@testcompany.com", "aOpTYjdls", "A007", "IT-avdelningen", company);
        userSocu1.setId(1L);
        userSocu2 = new UserSocu(Usertype.ADMIN, "Erik Eriksson", "erik.eriksson@testcompany.com", "p56GkdoUyyy", "A008", "IT-avdelningen", company);
        userSocu2.setId(2L);

        company2 = new Company(5502020202L, "TestCompany2 AB");
        userSocu3 = new UserSocu(Usertype.USER, "Angelina Björk", "angelina@testcompany2.com", "slkdjfSGslri", "", "Lager", company2);
        userSocu3.setId(3L);
        userSocu4 = new UserSocu(Usertype.ADMIN, "Hans Ek", "hans@testcompany2.com", "lsgjSJRGlgs1", "", "Service Desk", company2);
        userSocu4.setId(4L);

        userDTO = new UserDTO();
        userDTO.setUsertype(Usertype.USER);
        userDTO.setName("Caroline Canvas");
        userDTO.setEmail("caroline.canvas@company.com");
        userDTO.setEmploymentnumber("U4756");
        userDTO.setDepartment("Lager");
        userDTO.setCompanyname(company.getName());
        userDTO.setCompanyorganizationnumber(company.getOrganizationnumber());

        List<Company> companyList = Arrays.asList(company, company2);
        List<UserSocu> userSocuList = Arrays.asList(userSocu1, userSocu2, userSocu3, userSocu4);
        companyRepository.saveAll(companyList);
        userRepository.saveAll(userSocuList);
    }

    @AfterEach
    void teardown() throws IOException {
        userRepository.deleteAll();
        companyRepository.deleteAll();
        String folder = "client/angularclient/src/assets/ProfilePictures/";
        for (int i = 1; i < 10; i++) {
            String fileName = i + ".png";
            Path path = Paths.get(folder + fileName);
            Files.deleteIfExists(path);
        }
    }

    @Test
    void convertToUserDTOfromUserSocu() {
        UserDTO userDTOconvert = userService.convertToUserDTOfromUserSocu(userSocu1);
        assertNotNull(userDTOconvert);
        assertEquals(userSocu1.getEmail(), userDTOconvert.getEmail());
        assertEquals(userSocu1.getId(), userDTOconvert.getId());
    }

    @Test
    void convertToUserSocuFromUserDTO() {
        UserSocu userSocuconvert = userService.convertToUserSocuFromUserDTO(userDTO);
        assertNotNull(userSocuconvert);
        assertEquals(userDTO.getEmail(), userSocuconvert.getEmail());
        assertEquals(userDTO.getId(), userSocuconvert.getId());
    }

    @Test
    void getAllUserDTOsForCompany() {
        List<UserDTO> list = userService.getAllUserDTOsForCompany(5502020202L);
        assertEquals(2, list.size());
        List<UserDTO> list2 = userService.getAllUserDTOsForCompany(5503030302L);
        assertEquals(0, list2.size());
    }

    @Test
    void saveNewUser() {
        Iterable<UserSocu> iterable = userRepository.findAll();
        List<UserSocu> list = new ArrayList<>();
        for (UserSocu user : iterable
        ) {
            list.add(user);
        }
        assertEquals(4, list.size());
        userService.saveNewUser(userDTO);
        Iterable<UserSocu> iterable2 = userRepository.findAll();
        List<UserSocu> list2 = new ArrayList<>();
        for (UserSocu user : iterable2
        ) {
            list2.add(user);
        }
        assertEquals(5, list2.size());
        for (UserSocu user : list2
        ) {
            assertNotNull(user);
            assertNotNull(user.getName());
            assertNotNull(user.getEmail());
            if (user.getId() < 1) {
                fail();
            }
        }

        Optional<UserSocu> saveuserSocu = userRepository.findByEmail(userDTO.getEmail());
        if (saveuserSocu.isEmpty()) {
            fail("Användare har inte sparats korrekt.");
        } else {
            Path path = Paths.get("client/angularclient/src/assets/ProfilePictures/" + saveuserSocu.get().getId() + ".png");
            if (!Files.exists(path)) {
                fail("Ingen sparad profilbild för ny användare");
            }
        }
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