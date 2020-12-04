package se.socu.socialcube.Controllers;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;
import se.socu.socialcube.Repository.ActivityRepository;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class ActivityController {

    private final ActivityRepository activityRepository;

    public ActivityController(ActivityRepository activityRepository) {
        this.activityRepository = activityRepository;
    }
}
