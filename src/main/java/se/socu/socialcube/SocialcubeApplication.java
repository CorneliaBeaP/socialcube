package se.socu.socialcube;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import se.socu.socialcube.Entities.UserSocu;
import se.socu.socialcube.Repository.UserRepository;

@SpringBootApplication
public class SocialcubeApplication {

    public static void main(String[] args) {
        SpringApplication.run(SocialcubeApplication.class, args);
    }


    @Bean
    public CommandLineRunner setUp(UserRepository userRepository) {
        return (args -> {
//        userRepository.save(new UserSocu("Amanda"));
//        userRepository.save(new UserSocu("Anna"));
//        userRepository.save(new UserSocu("Andrea"));
        userRepository.findAll().forEach(System.out::println);
        });
    }

}

