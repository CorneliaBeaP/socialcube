package se.socu.socialcube.controller;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import se.socu.socialcube.DTO.ActivityDTO;
import se.socu.socialcube.DTO.UserDTO;
import se.socu.socialcube.entities.Response;
import se.socu.socialcube.service.ActivityService;
import se.socu.socialcube.service.UserService;

import java.util.ArrayList;

@CrossOrigin(origins = "http://localhost:4200", allowedHeaders = "*")
@RestController
public class ActivityController {


    public ActivityController(ActivityService activityService, UserService userService) {
        this.activityService = activityService;
        this.userService = userService;
    }

    private final ActivityService activityService;
    private final UserService userService;

    @GetMapping(path = "/api/home/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ArrayList<ActivityDTO> getAllActivitiesForCompany(@PathVariable long id) {
        return activityService.findAllActivitiesByCompany_organizationnumber(id);
    }

    @PostMapping(path = "/api/activity/add", produces = MediaType.APPLICATION_JSON_VALUE)
    public Response save(@RequestBody ActivityDTO activityDTO) {
        return activityService.saveActivityDTO(activityDTO);
    }

    @PostMapping(path = "/api/activity/update")
    public Response updateActivity(@RequestBody ActivityDTO activityDTO){
        return activityService.updateActivity(activityDTO);
    }

    @PostMapping(path = "/api/activity/attendactivity")
    public Response attendActivity(@RequestBody String[] info) {
        long userid = Long.parseLong(info[0]);
        long activityid = Long.parseLong(info[1]);
        return activityService.attendActivity(userid, activityid);
    }

    @GetMapping(path = "/api/activity/attendedactivities/{id}")
    public ArrayList<ActivityDTO> getAttendedActivities(@PathVariable long id) {
        return activityService.getAllAttendedActivities(id);
    }

    @GetMapping(path = "/api/activity/declinedactivities/{id}")
    public ArrayList<ActivityDTO> getDeclinedActivities(@PathVariable long id) {
        return activityService.getAllDeclinedActivities(id);
    }

    @GetMapping(path = "api/activity/attendees/{id}")
    public ArrayList<UserDTO> getAttendees(@PathVariable long id) {
        return userService.getAttendees(id);
    }

    @GetMapping(path = "api/activity/decline/{activityid}/{userid}")
    public Response declineActivity(@PathVariable long activityid, @PathVariable long userid){
        return activityService.declineActivity(activityid, userid);
    }

    @DeleteMapping(path = "api/activity/decline/{activityid}/{userid}")
    public Response declineAttendedActivity(@PathVariable long activityid, @PathVariable long userid) {
        return activityService.declineAttendedActivity(activityid, userid);
    }

    @GetMapping(path = "/api/activity/cancel/{id}")
    public Response cancelActivity(@PathVariable long id){
        return activityService.cancelActivity(id);
    }
}
