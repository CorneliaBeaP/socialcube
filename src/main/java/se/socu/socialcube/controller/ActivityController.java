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

//    @PostMapping(path = "/activity")
//    public void addActivity(@RequestBody String activity) {
//        System.out.println("Sparar aktivitet:" + activity);
////        activityService.saveActivityDTO(activityDTO);
//    }

//    @PostMapping(path = "/home/add", consumes = MediaType.APPLICATION_JSON_VALUE)
//    public String saveActivity(@RequestBody ActivityDTO activityDTO) {
//        System.out.println("Mottagit UserDTO");
//        activityService.saveActivityDTO(activityDTO);
//        return "Ok!";
//    }

    @GetMapping(path = "/api/home/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ArrayList<ActivityDTO> getAllActivitiesForCompany(@PathVariable long id) {
        System.out.println("Skickar aktiviteter...");
        return activityService.findAllActivitiesByCompany_organizationnumber(id);
    }

//    @PostMapping(value = "/api/activity/add", produces = MediaType.TEXT_PLAIN_VALUE)
//    public ResponseEntity<String> save(@RequestBody ActivityDTO activityDTO) {
//        HttpHeaders httpHeaders = new HttpHeaders();
//        httpHeaders.set("Access-Control-Allow-Origin", "*");
//        System.out.println(ResponseEntity.ok().header("Access-Control-Allow-Origin", "*"));
//        System.out.println("save ok");
//        return ResponseEntity.ok().headers(httpHeaders).body("Ok!");
//    }

    @PostMapping(path = "/api/activity/add", produces = MediaType.APPLICATION_JSON_VALUE)
    public Response save(@RequestBody ActivityDTO activityDTO) {
//        System.out.println("Beskrivning: " + activityDTO.getDescriptionsocu());
//        System.out.println("Typ: " + activityDTO.getActivitytype());
//        System.out.println("Aktivitetsdatum: " + activityDTO.getActivitydate());
//        System.out.println("Aktivitetsdatum: " + activityDTO.getActivitydate().toLocalTime());
//        System.out.println("Organisationsnummer: " + activityDTO.getCompanyorganizationnumber());
//        System.out.println("LocationAddress: " + activityDTO.getLocationaddress());
//        System.out.println("LocationName: " + activityDTO.getLocationname());
//        System.out.println("Skapad av id: " + activityDTO.getCreatedbyid());
//        System.out.println("RSVP-date: " + activityDTO.getRsvpdate());
        System.out.println("Lägger till aktivitet...");
        activityService.saveActivityDTO(activityDTO);
        Response response = new Response();
        response.setMessage("Aktivitet sparad");
        response.setStatus("OK");
        return response;
    }

//    @PostMapping(path = "/api/activity/add", produces = MediaType.APPLICATION_JSON_VALUE)
//    public ResponseEntity<ActivityDTO> receiveString(@RequestBody ActivityDTO stringy) {
//        System.out.println(stringy.toString());
//        ActivityDTO activityDTO = new ActivityDTO();
//        return ResponseEntity.ok().body(activityDTO);
//    }

    @PostMapping(path = "/api/activity/attendactivity")
    public Response attendActivity(@RequestBody String[] info) {
        long userid = Long.parseLong(info[0]);
        long activityid = Long.parseLong(info[1]);
        return activityService.attendActivity(userid, activityid);
    }

    @GetMapping(path = "/api/activity/attendedactivities/{id}")
    public ArrayList<ActivityDTO> getAttendedActivities(@PathVariable long id){
       return activityService.getAllAttendedActivities(id);
    }

    @GetMapping(path = "api/activity/attendees/{id}")
    public ArrayList<UserDTO> getAttendees(@PathVariable long id){
       return userService.getAttendees(id);
    }
}
