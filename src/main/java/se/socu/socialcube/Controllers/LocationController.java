package se.socu.socialcube.Controllers;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;
import se.socu.socialcube.Repository.LocationRepository;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class LocationController {

    private final LocationRepository locationRepository;

    public LocationController(LocationRepository locationRepository) {
        this.locationRepository = locationRepository;
    }
}
