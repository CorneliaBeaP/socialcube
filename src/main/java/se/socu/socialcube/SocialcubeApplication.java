package se.socu.socialcube;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import se.socu.socialcube.entities.*;
import se.socu.socialcube.repository.ActivityRepository;
import se.socu.socialcube.repository.CompanyRepository;
import se.socu.socialcube.repository.LocationRepository;
import se.socu.socialcube.repository.UserRepository;

import java.time.LocalDateTime;

@SpringBootApplication
public class SocialcubeApplication {

    public static void main(String[] args) {
        SpringApplication.run(SocialcubeApplication.class, args);
    }


    @Bean
    public CommandLineRunner setUp(UserRepository userRepository, CompanyRepository companyRepository, LocationRepository locationRepository, ActivityRepository activityRepository) {
        return (args -> {
            System.out.println("Applikationen startar");
            System.out.println("OK");
////            Skapa testföretag
//            Company company = new Company(929292929292L, "TestCompany");
//            companyRepository.save(company);
//
////            skapa testanvändare och testadmins
//            UserSocu userSocu1 = new UserSocu(Usertype.USER, "Hannah Patriksson", "hanna@company.com", "111", "34T", "IT-avdelningen", company);
//            UserSocu userSocu2 = new UserSocu(Usertype.ADMIN, "Fredrik Svensson", "fredrik@company.com", "123", "37T", "IT-avdelningen", company);
//            UserSocu userSocu3 = new UserSocu(Usertype.USER, "Magdalena Moos", "magdalena@company.com", "password", "38HT", "IT-avdelningen", company);
//            UserSocu userSocu4 = new UserSocu(Usertype.USER, "Angelica Hansson", "angelica@company.com", "password", "56T", "IT-avdelningen", company);
//            UserSocu userSocu5 = new UserSocu(Usertype.USER, "Mira Mathiesen", "mira@company.com", "losen23", "12Y", "IT-avdelningen", company);
//            userRepository.save(userSocu1);
//            userRepository.save(userSocu2);
//            userRepository.save(userSocu3);
//            userRepository.save(userSocu4);
//            userRepository.save(userSocu5);
//
////            skapa testlocations
//            Location location = new Location("Java Bar", "Stockholmsgatan 3, 11539 Stockholm");
//            Location location2 = new Location("Fikarummet", "Norgegatan 2, 11111 Stockholm");
//            locationRepository.save(location);
//            locationRepository.save(location2);
//
////            skapa testactivities
//            LocalDateTime activitydate1 = LocalDateTime.of(2020, 12, 19, 17, 0);
//            LocalDateTime rsvp1 = LocalDateTime.of(2020, 12, 10, 17, 0);
//            Activity activity1 = new Activity("AW", activitydate1, rsvp1, "Bästa AW:n nu firar vi Magda som fyller 23!", userSocu1, location);
//
//            LocalDateTime activitydate2 = LocalDateTime.of(2021, 1, 8, 16, 0, 0);
//            LocalDateTime rsvp2 = LocalDateTime.of(2021, 1, 8, 14, 0, 0);
//            Activity activity2 = new Activity("Fika för att fira av Magnus", activitydate2, rsvp2, "Vi firar av Magnus sista dag med lite tårta och kaffe.", userSocu2, location2);
//
//            activityRepository.save(activity1);
//            activityRepository.save(activity2);

//            skapar testföretag 2
//            Company company = new Company(10101010101L, "TestCompany 2");
//            companyRepository.save(company);
//
////            skapa testanvändare och testadmins
//            UserSocu userSocu1 = new UserSocu(Usertype.USER, "Maria Rodriguez", "maria@company2.com", "111", "6845", "Produktion", company);
//            UserSocu userSocu2 = new UserSocu(Usertype.ADMIN, "Angelina Sjöström", "angelina@company2.com", "123", "1354", "IT-avdelningen", company);
//            UserSocu userSocu3 = new UserSocu(Usertype.USER, "Erik Enqvist", "erik@company2.com", "1234", "1568", "Linux-gruppen", company);
//            UserSocu userSocu4 = new UserSocu(Usertype.USER, "Leif Hansson", "leif@company2.com", "11111", "7895", "Lager", company);
//            UserSocu userSocu5 = new UserSocu(Usertype.USER, "Cecilia Mattson", "cecilia@company2.com", "losen23", "1645", "IT-avdelningen", company);
//            userRepository.save(userSocu1);
//            userRepository.save(userSocu2);
//            userRepository.save(userSocu3);
//            userRepository.save(userSocu4);
//            userRepository.save(userSocu5);
//
////            skapa testlocations
//            Location location = new Location("Java Bar", "Stockholmsgatan 3, 11539 Stockholm");
//            Location location2 = new Location("Lunchrummet", "Regeringsgatan 21, 11153 Stockholm");
//            locationRepository.save(location);
//            locationRepository.save(location2);
//
////            skapa testactivities
//            LocalDateTime activitydate1 = LocalDateTime.of(2020, 12, 19, 17, 0);
//            LocalDateTime rsvp1 = LocalDateTime.of(2020, 12, 10, 17, 0);
//            Activity activity1 = new Activity("AW", activitydate1, rsvp1, "AW bara för att det är trevligt!", userSocu1, location, company);
//
//            LocalDateTime activitydate2 = LocalDateTime.of(2021, 1, 8, 12, 0, 0);
//            LocalDateTime rsvp2 = LocalDateTime.of(2021, 1, 8, 12, 0, 0);
//            Activity activity2 = new Activity("Lunch", activitydate2, rsvp2, "Pizzalunch för de som är sugna!", userSocu2, location2, company);
//
//            activityRepository.save(activity1);
//            activityRepository.save(activity2);
        });
    }

}

