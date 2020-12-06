package se.socu.socialcube.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;
import se.socu.socialcube.repository.CompanyRepository;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class CompanyController {

    private final CompanyRepository companyRepository;

    public CompanyController(CompanyRepository companyRepository) {
        this.companyRepository = companyRepository;
    }
}
