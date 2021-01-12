package se.socu.socialcube.service;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import se.socu.socialcube.DTO.ActivityDTO;
import se.socu.socialcube.entities.Activity;
import se.socu.socialcube.entities.Company;
import se.socu.socialcube.entities.UserSocu;
import se.socu.socialcube.entities.Usertype;
import se.socu.socialcube.repository.ActivityRepository;
import se.socu.socialcube.repository.CompanyRepository;
import se.socu.socialcube.repository.UserRepository;

import static org.junit.jupiter.api.Assertions.*;

import org.assertj.core.util.IterableUtil;


import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.Optional;
import java.util.logging.Level;
import java.util.logging.Logger;

@SpringBootTest
class ActivityServiceTest {

    @Autowired
    private ActivityService activityService;

    @Autowired
    private ActivityRepository repository;

    @Autowired
    private CompanyRepository companyRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    UserService userService;

    private Activity activity1;
    private Activity activity2;
    private UserSocu userSocu1;
    private UserSocu userSocu2;
    private ActivityDTO activityDTO;
    private Long activity1id;


    @BeforeEach
    void setUp() {
        Company company = new Company(5501010101L, "TestCompany AB");
        LocalDateTime localDateTime = LocalDateTime.now();

        userSocu1 = new UserSocu(Usertype.USER, "Anna Svensson", "anna.svensson@testcompany.com", "aOpTYjdls", "A007", "IT-avdelningen", company);
        userSocu2 = new UserSocu(Usertype.ADMIN, "Erik Eriksson", "erik.eriksson@testcompany.com", "p56GkdoUyyy", "A008", "IT-avdelningen", company);
        companyRepository.save(company);
        userRepository.save(userSocu1);
        userRepository.save(userSocu2);

        activity1 = new Activity("Fika", localDateTime.plusDays(3), localDateTime.plusDays(2), localDateTime, "Fika för att fira av Fia", false, userSocu1, "Fikarummet", "Värtavägen 31, 11538 Stockholm", company);
        repository.save(activity1);

        Optional<UserSocu> userSocuOptional = userRepository.findByEmail("anna.svensson@testcompany.com");
        activityDTO = new ActivityDTO();
        activityDTO.setCreatedBy(userService.convertToUserDTOfromUserSocu(userSocuOptional.get()));
        activityDTO.setCreateddate(localDateTime);
        activityDTO.setLocationname("Java Bar");
        activityDTO.setLocationaddress("Javavägen 23, 14523 Stockholm");
        activityDTO.setCreatedbyid(userSocuOptional.get().getId());
        activityDTO.setCompanyorganizationnumber(userSocuOptional.get().getCompany().getOrganizationnumber());
        activityDTO.setDescriptionsocu("AW på bästa baren!");
        activityDTO.setActivitytype("AW");
        activityDTO.setActivitydate(localDateTime.plusMonths(2));
        activityDTO.setRsvpdate(localDateTime.plusMonths(1));
        Logger logger = Logger.getLogger(ActivityServiceTest.class.getName());
        for (Activity a : repository.findAll()
        ) {
            logger.log(Level.INFO, a.getId() + "");
        }
    }

    @AfterEach
    void tearDown() throws IOException {
        repository.deleteAll();
        userRepository.deleteAll();
        companyRepository.deleteAll();
        String folder = "client/angularclient/src/assets/ProfilePictures/";
        for (int i = 1; i < 100; i++) {
            String fileName = i + ".png";
            Path path = Paths.get(folder + fileName);
            Files.deleteIfExists(path);
        }
    }

    @Test
    void saveActivityDTO() {
        Iterable<Activity> activities = repository.findAll();
        assertEquals(1, IterableUtil.sizeOf(activities));
        activityService.saveActivityDTO(activityDTO);
        activities = repository.findAll();
        assertEquals(2, IterableUtil.sizeOf(activities));
        Optional<Activity> activity = repository.findById(14L);
        assertEquals("AW", activity.get().getActivitytype());
        assertNotNull(activity);
    }

    @Test
    void declineActivity() {
    }

    @Test
    void declineAttendedActivity() {
    }

    @Test
    void attendDeclinedActivity() {
    }

    @Test
    void findAllActivitiesByCompany_organizationnumber() {
    }

    @Test
    void attendActivity() {
    }

    @Test
    void getAllAttendedActivities() {
    }

    @Test
    void getAllDeclinedActivities() {
    }

    @Test
    void updateActivity() {
    }

    @Test
    void cancelActivity() {
    }

    @Test
    void deleteActivity() {
    }
}