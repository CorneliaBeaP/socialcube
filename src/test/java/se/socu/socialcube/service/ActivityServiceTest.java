package se.socu.socialcube.service;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import se.socu.socialcube.DTO.ActivityDTO;
import se.socu.socialcube.entities.*;
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
import java.util.ArrayList;
import java.util.List;
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

    private ActivityDTO activityDTO;
    private List<Activity> activityList;
    private List<UserSocu> userSocuList;

    @BeforeEach
    void setUp() {

        Company company = new Company(5501010101L, "TestCompany AB");
        LocalDateTime localDateTime = LocalDateTime.now();

        UserSocu userSocu1 = new UserSocu(Usertype.USER, "Anna Svensson", "anna.svensson@testcompany.com", "aOpTYjdls", "A007", "IT-avdelningen", company);
        UserSocu userSocu2 = new UserSocu(Usertype.ADMIN, "Erik Eriksson", "erik.eriksson@testcompany.com", "p56GkdoUyyy", "A008", "IT-avdelningen", company);
        companyRepository.save(company);
        userRepository.save(userSocu1);
        userRepository.save(userSocu2);

        Activity activity1 = new Activity("Fika", localDateTime.plusDays(3), localDateTime.plusDays(2), localDateTime, "Fika för att fira av Fia", false, userSocu1, "Fikarummet", "Värtavägen 31, 11538 Stockholm", company);
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

        activityList = new ArrayList<>();
        userSocuList = new ArrayList<>();
        for (Activity a : repository.findAll()
        ) {
            activityList.add(a);
        }
        for (UserSocu u : userRepository.findAll()
        ) {
            userSocuList.add(u);
        }

//        Logger logger = Logger.getLogger(ActivityServiceTest.class.getName());
//        for (Activity a : repository.findAll()
//        ) {
//            logger.log(Level.INFO, a.getId() + "");
//        }
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

        activityList.clear();
        userSocuList.clear();
    }

    @Test
    void saveActivityDTO() {
        Iterable<Activity> activities = repository.findAll();
        assertEquals(1, IterableUtil.sizeOf(activities));
        activityService.saveActivityDTO(activityDTO);
        activities = repository.findAll();
        assertEquals(2, IterableUtil.sizeOf(activities));
        activityList.clear();
        for (Activity a : activities
        ) {
            activityList.add(a);
        }
        Optional<Activity> activity = repository.findById(activityList.get(1).getId());
        assertEquals("AW", activity.get().getActivitytype());
        assertNotNull(activity);
    }

    @Test
    void declineActivity() {
        Iterable<Activity> activities = repository.findAllDeclinedActivitiesByUsersocuId(userSocuList.get(0).getId());
        assertEquals(0, IterableUtil.sizeOf(activities));
        activityService.declineActivity(activityList.get(0).getId(), userSocuList.get(0).getId());
        activities = repository.findAllDeclinedActivitiesByUsersocuId(userSocuList.get(0).getId());
        assertEquals(1, IterableUtil.sizeOf(activities));
        for (Activity a : activities
        ) {
            assertEquals(activityList.get(0).getId(), a.getId());
        }
    }

    @Test
    void declineAttendedActivity() {
        Iterable<Activity> attendedActivities = repository.findAllAttendedActivitiesByUsersocuId(userSocuList.get(0).getId());
        Iterable<Activity> declinedActivitiesByUsersocuId = repository.findAllDeclinedActivitiesByUsersocuId(userSocuList.get(0).getId());
        Iterable<UserSocu> attendees = userRepository.findAllAttendeesByActivityId(activityList.get(0).getId());
        Iterable<UserSocu> decliners = userRepository.findAllDeclinersByActivityId(activityList.get(0).getId());

        assertEquals(0, IterableUtil.sizeOf(attendedActivities));
        assertEquals(0, IterableUtil.sizeOf(declinedActivitiesByUsersocuId));
        assertEquals(0, IterableUtil.sizeOf(attendees));
        assertEquals(0, IterableUtil.sizeOf(decliners));

        activityService.attendActivity(userSocuList.get(0).getId(), activityList.get(0).getId());
        attendedActivities = repository.findAllAttendedActivitiesByUsersocuId(userSocuList.get(0).getId());
        declinedActivitiesByUsersocuId = repository.findAllDeclinedActivitiesByUsersocuId(userSocuList.get(0).getId());
        attendees = userRepository.findAllAttendeesByActivityId(activityList.get(0).getId());
        decliners = userRepository.findAllDeclinersByActivityId(activityList.get(0).getId());

        assertEquals(1, IterableUtil.sizeOf(attendedActivities));
        assertEquals(0, IterableUtil.sizeOf(declinedActivitiesByUsersocuId));
        assertEquals(1, IterableUtil.sizeOf(attendees));
        assertEquals(0, IterableUtil.sizeOf(decliners));

        activityService.declineAttendedActivity(activityList.get(0).getId(), userSocuList.get(0).getId());
        attendedActivities = repository.findAllAttendedActivitiesByUsersocuId(userSocuList.get(0).getId());
        declinedActivitiesByUsersocuId = repository.findAllDeclinedActivitiesByUsersocuId(userSocuList.get(0).getId());
        attendees = userRepository.findAllAttendeesByActivityId(activityList.get(0).getId());
        decliners = userRepository.findAllDeclinersByActivityId(activityList.get(0).getId());

        assertEquals(0, IterableUtil.sizeOf(attendedActivities));
        assertEquals(1, IterableUtil.sizeOf(declinedActivitiesByUsersocuId));
        assertEquals(0, IterableUtil.sizeOf(attendees));
        assertEquals(1, IterableUtil.sizeOf(decliners));
    }

    @Test
    void attendDeclinedActivity() {
        Iterable<Activity> attendedActivities = repository.findAllAttendedActivitiesByUsersocuId(userSocuList.get(0).getId());
        Iterable<Activity> declinedActivitiesByUsersocuId = repository.findAllDeclinedActivitiesByUsersocuId(userSocuList.get(0).getId());
        Iterable<UserSocu> attendees = userRepository.findAllAttendeesByActivityId(activityList.get(0).getId());
        Iterable<UserSocu> decliners = userRepository.findAllDeclinersByActivityId(activityList.get(0).getId());

        assertEquals(0, IterableUtil.sizeOf(attendedActivities));
        assertEquals(0, IterableUtil.sizeOf(declinedActivitiesByUsersocuId));
        assertEquals(0, IterableUtil.sizeOf(attendees));
        assertEquals(0, IterableUtil.sizeOf(decliners));

        activityService.declineActivity(activityList.get(0).getId(), userSocuList.get(0).getId());
        attendedActivities = repository.findAllAttendedActivitiesByUsersocuId(userSocuList.get(0).getId());
        declinedActivitiesByUsersocuId = repository.findAllDeclinedActivitiesByUsersocuId(userSocuList.get(0).getId());
        attendees = userRepository.findAllAttendeesByActivityId(activityList.get(0).getId());
        decliners = userRepository.findAllDeclinersByActivityId(activityList.get(0).getId());

        assertEquals(0, IterableUtil.sizeOf(attendedActivities));
        assertEquals(1, IterableUtil.sizeOf(declinedActivitiesByUsersocuId));
        assertEquals(0, IterableUtil.sizeOf(attendees));
        assertEquals(1, IterableUtil.sizeOf(decliners));

        activityService.attendDeclinedActivity(userSocuList.get(0).getId(), activityList.get(0).getId());
        attendedActivities = repository.findAllAttendedActivitiesByUsersocuId(userSocuList.get(0).getId());
        declinedActivitiesByUsersocuId = repository.findAllDeclinedActivitiesByUsersocuId(userSocuList.get(0).getId());
        attendees = userRepository.findAllAttendeesByActivityId(activityList.get(0).getId());
        decliners = userRepository.findAllDeclinersByActivityId(activityList.get(0).getId());

        assertEquals(1, IterableUtil.sizeOf(attendedActivities));
        assertEquals(0, IterableUtil.sizeOf(declinedActivitiesByUsersocuId));
        assertEquals(1, IterableUtil.sizeOf(attendees));
        assertEquals(0, IterableUtil.sizeOf(decliners));
    }

    @Test
    void findAllActivitiesByCompany_organizationnumber() {
        Iterable<ActivityDTO> activities = activityService.findAllActivitiesByCompany_organizationnumber(5501010101L);
        assertEquals(1, IterableUtil.sizeOf(activities));
        activities = activityService.findAllActivitiesByCompany_organizationnumber(909090);
        assertEquals(0, IterableUtil.sizeOf(activities));
        activities = activityService.findAllActivitiesByCompany_organizationnumber(5501670287L);
        assertEquals(0, IterableUtil.sizeOf(activities));
    }

    @Test
    void attendActivity() {
        activityService.attendActivity(userSocuList.get(0).getId(), activityList.get(0).getId());
        Iterable<Activity> activities = repository.findAllAttendedActivitiesByUsersocuId(userSocuList.get(0).getId());
        assertEquals(1, IterableUtil.sizeOf(activities));
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