package se.socu.socialcube.Controllers;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;
import se.socu.socialcube.Repository.CompanyRepository;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class CompanyController {

    private final CompanyRepository companyRepository;

    public CompanyController(CompanyRepository companyRepository) {
        this.companyRepository = companyRepository;
    }
}
