package se.socu.socialcube;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import se.socu.socialcube.Entities.Company;
import se.socu.socialcube.Entities.UserSocu;
import se.socu.socialcube.Repository.CompanyRepository;
import se.socu.socialcube.Repository.UserRepository;

@SpringBootApplication
public class SocialcubeApplication {

    public static void main(String[] args) {
        SpringApplication.run(SocialcubeApplication.class, args);
    }


    @Bean
    public CommandLineRunner setUp(UserRepository userRepository, CompanyRepository companyRepository) {
        return (args -> {
//        userRepository.save(new UserSocu("Amanda"));
//        userRepository.save(new UserSocu("Anna"));
//        userRepository.save(new UserSocu("Andrea"));

//            companyRepository.save(new Company(929292929292L, "TestCompany"));

        userRepository.findAll().forEach(System.out::println);
        });
    }

}

