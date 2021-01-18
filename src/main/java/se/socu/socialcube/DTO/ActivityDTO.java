package se.socu.socialcube.DTO;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

/**
 * Data Transfer Object for sending information about an activity to and from the client
 */
@Getter
@Setter
public class ActivityDTO {

    /**
     * Id from database of the activity
     */
    private long id;

    /**
     * Type of the activity, ex After Work, Christmas party etc...
     */
    private String activitytype;

    /**
     * The date of which the activity takes place on
     */
    private LocalDateTime activitydate;

    /**
     * Eventual RSVP date, not obligatory
     */
    private LocalDateTime rsvpdate;

    /**
     * The date of which the activity was created
     */
    private LocalDateTime createddate;

    /**
     * A description of the activity
     */
    private String descriptionsocu;

    /**
     * ID of the user that created the activity
     */
    private long createdbyid;

    /**
     * The name of the place of which the activity takes place at
     */
    private String locationname;

    /**
     * The address of the place of which the activity takes place at
     */
    private String locationaddress;

    /**
     * The company the activity is registered to and the user who created the activity works at
     */
    private long companyorganizationnumber;

    /**
     * The user that has created the activity
     */
    private UserDTO createdBy;

    /**
     * Boolean describing if the activity is cancelled or not cancelled
     */
    private boolean cancelled;

    /**
     * ToString-method providing information about the activityDTO
     * @return a string containing information about id, activity type, activitydate, RSVP-date, date the activity is created, description of the activity, if the activity is cancelled or not and location name and adress where the activity takes place.
     */
    @Override
    public String toString() {
        return "ActivityDTO{" +
                "id=" + id +
                ", activitytype='" + activitytype + '\'' +
                ", activitydate=" + activitydate +
                ", rsvpdate=" + rsvpdate +
                ", createddate=" + createddate +
                ", descriptionsocu='" + descriptionsocu + '\'' +
                ", createdbyid=" + createdbyid +
                ", locationname='" + locationname + '\'' +
                ", locationaddress='" + locationaddress + '\'' +
                ", companyorganizationnumber=" + companyorganizationnumber +
                ", createdBy=" + createdBy +
                ", cancelled=" + cancelled +
                '}';
    }
}
