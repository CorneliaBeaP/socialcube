package se.socu.socialcube;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import se.socu.socialcube.repository.ActivityRepository;
import se.socu.socialcube.repository.CompanyRepository;
import se.socu.socialcube.repository.UserRepository;
import se.socu.socialcube.service.UserService;

import java.time.LocalDateTime;

@SpringBootApplication
public class SocialcubeApplication {

    public static void main(String[] args) {
        SpringApplication.run(SocialcubeApplication.class, args);
    }


    @Bean
    public CommandLineRunner setUp(UserRepository userRepository, CompanyRepository companyRepository, ActivityRepository activityRepository, UserService userService) {
        return (args -> {
            System.out.println(LocalDateTime.now() +  " Applikationen startar");
        });
    }


}

