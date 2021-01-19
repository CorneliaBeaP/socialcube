package se.socu.socialcube.controller;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import se.socu.socialcube.DTO.ActivityDTO;
import se.socu.socialcube.DTO.UserDTO;
import se.socu.socialcube.entities.Response;
import se.socu.socialcube.service.ActivityService;
import se.socu.socialcube.service.UserService;

import java.io.IOException;
import java.util.ArrayList;

@CrossOrigin(origins = "http://localhost:4200", allowedHeaders = "*")
@RestController
public class ActivityController {

    /**
     * Constructor for the ActivityController
     * @param activityService a service used to communicate with the repository which in turn communicates with the database when it regards an activity
     * @param userService a service used to communicate with the repository which in turn communicates with the database when it regards an user
     */
    public ActivityController(ActivityService activityService, UserService userService) {
        this.activityService = activityService;
        this.userService = userService;
    }

    /**
     * A service used to communicate with the repository which in turn communicates with the database when it regards an activity
     */
    private final ActivityService activityService;
    /**
     * A service used to communicate with the repository which in turn communicates with the database when it regards an user
     */
    private final UserService userService;

    /**
     * Gets a request from the client to receive all registered activities for a specific company that the user who is requesting the information is registered to/works at.
     * @param token the JWT that is connected to the user that is sending the request
     * @return a list with the activities
     */
    @GetMapping(path = "/api/home/{token}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ArrayList<ActivityDTO> getAllActivitiesForCompany(@PathVariable String token){
        return activityService.findAllActivitiesByCompany_organizationnumber(userService.getUserFromJWT(token).getCompanyorganizationnumber());
    }

    /**
     * Gets information from the client about a new activity that is to be saved, forwards the information to the ActivityService which in turn communicates with the database.
     * @param activityDTO a data transfer object with information about the new activity
     * @return a response with information about if the activity was successfully saved to the database or if there were errors
     */
    @PostMapping(path = "/api/activity/add", produces = MediaType.APPLICATION_JSON_VALUE)
    public Response save(@RequestBody ActivityDTO activityDTO) {
        return activityService.saveActivityDTO(activityDTO);
    }

    /**
     * Gets information from the client that an existing activity is being updated and forwards the information to the ActivityService which in turn communicates with the database.
     * @param activityDTO a data transfer object with information about the activity, both old and new information
     * @return a response with information about if the activity was successfully updated in the database or if there were errors
     */
    @PostMapping(path = "/api/activity/update")
    public Response updateActivity(@RequestBody ActivityDTO activityDTO){
        return activityService.updateActivity(activityDTO);
    }

    /**
     * Gets information from the client that a user has attended an activity and forwards that information to the ActivityService which in turn communicates with the database.
     * @param token a JWT that is connected to the user that is sending the request and is attending the activity
     * @param activityid the id of the activity
     * @return a response with information about if the information was successfully saved in the database or if there were errors
     */
    @GetMapping(path = "/api/activity/attendactivity/{token}/{activityid}")
    public Response attendActivity(@PathVariable String token, @PathVariable long activityid) {
        return activityService.attendActivity(userService.getUserIDFromJWT(token), activityid);
    }

    /**
     * Gets information from the client that a user has attended an activity which he earlier had declined, and then forwards that information to the ActivityService which in turn communicates with the database.
     * @param token a JWT that is connected to the user that is sending the request and is attending the activity
     * @param activityid the id of the activity
     * @return a response with information about if the information was successfully updated in the database or if there were errors
     */
    @GetMapping(path = "api/activity/attenddeclined/{token}/{activityid}")
    public Response attendDeclinedActivity(@PathVariable String token, @PathVariable long activityid){
        return activityService.attendDeclinedActivity(userService.getUserIDFromJWT(token), activityid);
    }

    /**
     * Gets a request from the client to receive all the activities that the currently logged in user has attended.
     * @param token a JWT that is connected to the currently logged in user
     * @return the list of activities
     */
    @GetMapping(path = "/api/activity/attendedactivities/{token}")
    public ArrayList<ActivityDTO> getAttendedActivities(@PathVariable String token) {
        return activityService.getAllAttendedActivities(userService.getUserIDFromJWT(token));
    }

    /**
     * Gets a request from the client to receive all the activities that the currently logged in user has declined.
     * @param token a JWT that is connected to the currently logged in user
     * @return the list of activities
     */
    @GetMapping(path = "/api/activity/declinedactivities/{token}")
    public ArrayList<ActivityDTO> getDeclinedActivities(@PathVariable String token) {
        return activityService.getAllDeclinedActivities(userService.getUserIDFromJWT(token));
    }

    /**
     * Gets a request from the client to receive all the users who have attended a specific activity.
     * @param id the id of the activity
     * @return the list of users that has attended the activity
     */
    @GetMapping(path = "api/activity/attendees/{id}")
    public ArrayList<UserDTO> getAttendees(@PathVariable long id) {
        return userService.getAttendees(id);
    }

    /**
     * Gets information from the client that a user has declined an activity and forwards that information to the ActivityService which in turn communicates with the database.
     * @param activityid the id of the activity
     * @param userid the id of the user
     * @return a response with information about if the information was successfully updated in the database or if there were errors
     */
    @GetMapping(path = "api/activity/decline/{activityid}/{userid}")
    public Response declineActivity(@PathVariable long activityid, @PathVariable long userid){
        return activityService.declineActivity(activityid, userid);
    }

    /**
     * Gets information from the client that a user has declined an activity which he earlier had attended, and then forwards that information to the ActivityService which in turn communicates with the database.
     * @param activityid the id of the activity
     * @param userid the id of the user
     * @return a response with information about if the information was successfully updated in the database or if there were errors
     */
    @DeleteMapping(path = "api/activity/decline/{activityid}/{userid}")
    public Response declineAttendedActivity(@PathVariable long activityid, @PathVariable long userid) {
        return activityService.declineAttendedActivity(activityid, userid);
    }

    /**
     * Gets information from the client that an activity should be cancelled, and then forwards that information to the ActivityService which in turn communicates with the database.
     * @param id the id of the activity
     * @return a response with information about if the activity was successfully cancelled in the database or if there were errors
     */
    @GetMapping(path = "/api/activity/cancel/{id}")
    public Response cancelActivity(@PathVariable long id){
        return activityService.cancelActivity(id);
    }

    /**
     * Gets information from the client that an activity should be deleted from the database, and then forwards that information to the ActivityService which in turn communicates with the database.
     * @param id the id of the activity
     * @return a response with information about if the activity was successfully deleted from the database or if there were errors
     */
    @GetMapping(path = "/api/activity/delete/{id}")
    public Response deleteActivity(@PathVariable long id){
        return activityService.deleteActivity(id);
    }
}
