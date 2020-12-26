package se.socu.socialcube.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import se.socu.socialcube.DTO.ActivityDTO;
import se.socu.socialcube.DTO.UserDTO;
import se.socu.socialcube.entities.Activity;
import se.socu.socialcube.entities.Company;
import se.socu.socialcube.entities.Response;
import se.socu.socialcube.entities.UserSocu;
import se.socu.socialcube.repository.ActivityRepository;
import se.socu.socialcube.repository.CompanyRepository;
import se.socu.socialcube.repository.UserRepository;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class ActivityService {

    private ActivityRepository activityRepository;
    private UserRepository userRepository;
    private CompanyRepository companyRepository;

    public ActivityService(ActivityRepository activityRepository, UserRepository userRepository, CompanyRepository companyRepository) {
        this.activityRepository = activityRepository;
        this.userRepository = userRepository;
        this.companyRepository = companyRepository;
    }

    private ActivityDTO convertToActivityDTOfromActivity(Activity activity) {
        ActivityDTO activityDTO = new ActivityDTO();
        activityDTO.setId(activity.getId());
        activityDTO.setActivitytype(activity.getActivitytype());
        activityDTO.setActivitydate(activity.getActivitydate());
        activityDTO.setRsvpdate(activity.getRsvpdate());
        activityDTO.setDescriptionsocu(activity.getDescriptionsocu());
        activityDTO.setCompanyorganizationnumber(activity.getCompany().getOrganizationnumber());
        activityDTO.setCreatedbyid(activity.getCreatedby().getId());
        activityDTO.setLocationname(activity.getLocationname());
        activityDTO.setLocationaddress(activity.getLocationaddress());
        activityDTO.setCreateddate(activity.getCreateddate());
        return activityDTO;
    }

    private Activity convertToActivityFromActivityDTO(ActivityDTO activityDTO) {
        Activity activity = new Activity();
        activity.setId(activityDTO.getId());
        activity.setActivitytype(activityDTO.getActivitytype());
        activity.setActivitydate(activityDTO.getActivitydate());
        activity.setRsvpdate(activityDTO.getRsvpdate());
        activity.setDescriptionsocu(activityDTO.getDescriptionsocu());
        activity.setLocationname(activityDTO.getLocationname());
        activity.setLocationaddress(activityDTO.getLocationaddress());
        activity.setCreateddate(activityDTO.getCreateddate());
        Optional<Company> company = companyRepository.findById(activityDTO.getCompanyorganizationnumber());
        if (company.isPresent()) {
            activity.setCompany(company.get());
        }
        Optional<UserSocu> userSocu = userRepository.findById(activityDTO.getCreatedbyid());
        if (userSocu.isPresent()) {
            activity.setCreatedby(userSocu.get());
        }
        return activity;
    }

    public void saveActivityDTO(ActivityDTO activityDTO) {
        try {
            activityRepository.save(convertToActivityFromActivityDTO(activityDTO));
        } catch (Exception e) {
            // TODO: bättre felhantering
            System.out.println(Arrays.toString(e.getStackTrace()));
        }
    }

    public ArrayList<ActivityDTO> findAllActivitiesByCompany_organizationnumber(long organizationnumber) {
        ArrayList<Activity> activities = activityRepository.findAllByCompany_organizationnumber(organizationnumber);
        ArrayList<ActivityDTO> activityDTOS = new ArrayList<>();
        for (Activity activity : activities
        ) {
            ActivityDTO activityDTO = convertToActivityDTOfromActivity(activity);
            activityDTOS.add(activityDTO);
        }
        return activityDTOS;
    }

    public Response attendActivity(long userid, long activityid) {
        Response response = new Response();
        Optional<Activity> activity = activityRepository.findById(activityid);
        Optional<UserSocu> userSocu = userRepository.findById(userid);
        if (activity.isPresent() && userSocu.isPresent()) {
            List<UserSocu> attendees = activity.get().getAttendees();
            attendees.add(userSocu.get());
            activity.get().setAttendees(attendees);
            response.setStatus("OK");
            response.setMessage("Attendee added");
        } else {
            response.setStatus("ERROR");
            response.setMessage("Not able to add attendee");
        }
        return response;
    }

    public ArrayList<ActivityDTO> getAllAttendedActivities(long userid) {
        String string = "" + userid;
        ArrayList<Activity> activities = activityRepository.findAllAttendedActivitiesByUsersocuId(Long.parseLong(string));
        ArrayList<ActivityDTO> activityDTOS = new ArrayList<>();
        for (Activity a: activities
             ) {
            activityDTOS.add(convertToActivityDTOfromActivity(a));
        }
        return activityDTOS;
    }
}
