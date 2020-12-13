package se.socu.socialcube.controller;

import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import se.socu.socialcube.DTO.ActivityDTO;
import se.socu.socialcube.service.ActivityService;

import java.util.ArrayList;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
public class ActivityController {


    public ActivityController(ActivityService activityService) {
        this.activityService = activityService;
    }

    private final ActivityService activityService;

//    @PostMapping(path = "/activity")
//    public void addActivity(@RequestBody String activity) {
//        System.out.println("Sparar aktivitet:" + activity);
////        activityService.saveActivityDTO(activityDTO);
//    }

    @PostMapping(path = "/home", produces = MediaType.APPLICATION_JSON_VALUE)
    public String saveActivity(@RequestParam String usercredentials) {
        System.out.println("Got it");
        return usercredentials;
    }

    @GetMapping(path = "/home/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ArrayList<ActivityDTO> getAllActivitiesForCompany(@PathVariable long id) {
        System.out.println("Skickar aktiviteter...");
        return activityService.findAllActivitiesByCompany_organizationnumber(id);
    }

    //    @GetMapping("/user/{id}")
//    public UserDTO getUser(@PathVariable long id) {
//        return userRepository.findById(id);
//    }
}
