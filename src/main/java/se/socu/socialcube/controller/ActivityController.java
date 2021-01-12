package se.socu.socialcube.controller;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import se.socu.socialcube.DTO.ActivityDTO;
import se.socu.socialcube.DTO.UserDTO;
import se.socu.socialcube.entities.Response;
import se.socu.socialcube.service.ActivityService;
import se.socu.socialcube.service.UserService;

import javax.websocket.server.PathParam;
import java.io.IOException;
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

    @GetMapping(path = "/api/home/{token}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ArrayList<ActivityDTO> getAllActivitiesForCompany(@PathVariable String token) throws IOException {
        return activityService.findAllActivitiesByCompany_organizationnumber(userService.getUserFromJWT(token).getCompanyorganizationnumber());
    }

    @PostMapping(path = "/api/activity/add", produces = MediaType.APPLICATION_JSON_VALUE)
    public Response save(@RequestBody ActivityDTO activityDTO) {
        return activityService.saveActivityDTO(activityDTO);
    }

    @PostMapping(path = "/api/activity/update")
    public Response updateActivity(@RequestBody ActivityDTO activityDTO){
        return activityService.updateActivity(activityDTO);
    }

    @GetMapping(path = "/api/activity/attendactivity/{token}/{activityid}")
    public Response attendActivity(@PathVariable String token, @PathVariable long activityid) {
        return activityService.attendActivity(userService.getUserIDFromJWT(token), activityid);
    }

    @GetMapping(path = "api/activity/attenddeclined/{token}/{activityid}")
    public Response attendDeclinedActivity(@PathVariable String token, @PathVariable long activityid){
        return activityService.attendDeclinedActivity(userService.getUserIDFromJWT(token), activityid);
    }

    @GetMapping(path = "/api/activity/attendedactivities/{token}")
    public ArrayList<ActivityDTO> getAttendedActivities(@PathVariable String token) {
        return activityService.getAllAttendedActivities(userService.getUserIDFromJWT(token));
    }

    @GetMapping(path = "/api/activity/declinedactivities/{token}")
    public ArrayList<ActivityDTO> getDeclinedActivities(@PathVariable String token) {
        return activityService.getAllDeclinedActivities(userService.getUserIDFromJWT(token));
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

    @GetMapping(path = "/api/activity/delete/{id}")
    public Response deleteActivity(@PathVariable long id){
        return activityService.deleteActivity(id);
    }
}
