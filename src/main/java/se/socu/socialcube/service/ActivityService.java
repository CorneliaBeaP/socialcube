package se.socu.socialcube.service;

import antlr.collections.List;
import antlr.collections.impl.LList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import se.socu.socialcube.DTO.ActivityDTO;
import se.socu.socialcube.entities.Activity;
import se.socu.socialcube.repository.ActivityRepository;

import java.util.ArrayList;

@Service
public class ActivityService {

    @Autowired
    private ActivityRepository activityRepository;

    private ActivityDTO convertToActivityDTOfromActivity(Activity activity) {
        ActivityDTO activityDTO = new ActivityDTO();
        activityDTO.setId(activity.getId());
        activityDTO.setActivitytype(activity.getActivitytype());
        activityDTO.setActivitydate(activity.getActivitydate());
        activityDTO.setRsvpdate(activity.getRsvpdate());
        activityDTO.setDescriptionsocu(activity.getDescriptionsocu());
        activityDTO.setCompanyorganizationnumber(activity.getCompany().getOrganizationnumber());
        activityDTO.setCreatedbyid(activity.getCreatedby().getId());
        activityDTO.setLocationname(activity.getLocation().getName());
        activityDTO.setLocationaddress(activity.getLocation().getAddress());
        return activityDTO;
    }

    private Activity convertToActivityFromActivityDTO(ActivityDTO activityDTO) {
        Activity activity = new Activity();
        activity.setId(activityDTO.getId());
        activity.setActivitytype(activityDTO.getActivitytype());
        activity.setActivitydate(activityDTO.getActivitydate());
        activity.setRsvpdate(activityDTO.getRsvpdate());
        activity.setDescriptionsocu(activityDTO.getDescriptionsocu());
//      TODO: nedan behövs lösas med ny lösning

//        activity.setLocation(activityDTO.getLocation());
//        activity.setCreatedby(activityDTO.getCreatedby());
        return activity;
    }

    public void saveActivityDTO(ActivityDTO activityDTO) {
        activityRepository.save(convertToActivityFromActivityDTO(activityDTO));
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
}
