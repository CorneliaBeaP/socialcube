package se.socu.socialcube;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import se.socu.socialcube.entities.Company;
import se.socu.socialcube.entities.UserSocu;
import se.socu.socialcube.entities.Usertype;
import se.socu.socialcube.repository.ActivityRepository;
import se.socu.socialcube.repository.CompanyRepository;
import se.socu.socialcube.repository.UserRepository;
import se.socu.socialcube.service.UserService;

import java.util.Calendar;
import java.util.Date;
import java.util.TimeZone;

@SpringBootApplication
public class SocialcubeApplication {

    public static void main(String[] args) {
        SpringApplication.run(SocialcubeApplication.class, args);
    }


    @Bean
    public CommandLineRunner setUp(UserRepository userRepository, CompanyRepository companyRepository, ActivityRepository activityRepository, UserService userService) {
        return (args -> {
//            BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
            System.out.println("Applikationen startar");
//            Iterable<UserSocu> userSocus = userRepository.findAll();
//            int counter = 0;
//            for (UserSocu u: userSocus
//                 ) {
//                counter++;
//            }
//            if(counter<1){
//                //           Skapa testföretag
//                companyRepository.deleteAll();
//                Company company = new Company(5501670287L, "Testbolaget AB");
//                companyRepository.save(company);
//
////            skapa testanvändare och testadmins
//                UserSocu userSocu1 = new UserSocu(Usertype.USER, "Hannah Patriksson", "hanna@company.com", passwordEncoder.encode("111"), "34T", "IT-avdelningen", company);
//                UserSocu userSocu2 = new UserSocu(Usertype.ADMIN, "Fredrik Svensson", "fredrik@company.com", passwordEncoder.encode("123"), "37T", "IT-avdelningen", company);
//                UserSocu userSocu3 = new UserSocu(Usertype.USER, "Magdalena Moos", "magdalena@company.com", passwordEncoder.encode("password"), "38HT", "IT-avdelningen", company);
//                UserSocu userSocu4 = new UserSocu(Usertype.USER, "Angelica Hansson", "angelica@company.com", passwordEncoder.encode("password"), "56T", "IT-avdelningen", company);
//                UserSocu userSocu5 = new UserSocu(Usertype.USER, "Mira Mathiesen", "mira@company.com", passwordEncoder.encode("losen23"), "12Y", "IT-avdelningen", company);
//                userRepository.save(userSocu1);
//                userRepository.save(userSocu2);
//                userRepository.save(userSocu3);
//                userRepository.save(userSocu4);
//                userRepository.save(userSocu5);
//
////            skapar testföretag 2
//                Company company2 = new Company(5572956478L, "TestCompany Ltd");
//                companyRepository.save(company2);
//
////            skapa testanvändare och testadmins
//                UserSocu userSocu6 = new UserSocu(Usertype.USER, "Maria Rodriguez", "maria@company2.com", passwordEncoder.encode("111"), "6845", "Produktion", company2);
//                UserSocu userSocu7 = new UserSocu(Usertype.ADMIN, "Angelina Sjöström", "angelina@company2.com", passwordEncoder.encode("123"), "1354", "IT-avdelningen", company2);
//                UserSocu userSocu8 = new UserSocu(Usertype.USER, "Erik Enqvist", "erik@company2.com", passwordEncoder.encode("1234"), "1568", "Linux-gruppen", company2);
//                UserSocu userSocu9 = new UserSocu(Usertype.USER, "Leif Hansson", "leif@company2.com", passwordEncoder.encode("11111"), "7895", "Lager", company2);
//                UserSocu userSocu10 = new UserSocu(Usertype.USER, "Cecilia Mattson", "cecilia@company2.com", passwordEncoder.encode("losen23"), "1645", "IT-avdelningen", company2);
//                userRepository.save(userSocu6);
//                userRepository.save(userSocu7);
//                userRepository.save(userSocu8);
//                userRepository.save(userSocu9);
//                userRepository.save(userSocu10);
//
//                for (UserSocu u: userRepository.findAll()
//                     ) {
//                    userService.copyDefaultPictureForNewUser(u.getId());
//                }
//
//                TimeZone timeZone = TimeZone.getDefault();
//                Date date = Calendar.getInstance().getTime();
//                System.out.println(timeZone.getDisplayName());
//                System.out.println(date);
//            }
        });
    }


}

