package se.socu.socialcube.entities;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.List;


/**
 * Entity used for all the activities.
 */
@Getter
@Setter
@Entity(name = "ACTIVITY")
public class Activity implements Serializable {

    /**
     * The ID that autogenerates once the entity is saved in the database
     */
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
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
     * Boolean describing if the activity is cancelled or not cancelled
     */
    private boolean cancelled;

    /**
     * The user that has created the activity
     */
    @ManyToOne(fetch = FetchType.LAZY)
    private UserSocu createdby;

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
    @ManyToOne(fetch = FetchType.LAZY)
    private Company company;

    /**
     * List of users who are attending the activity
     */
    @JoinTable(name = "ATTENDEDACTIVITIES", joinColumns = @JoinColumn(name = "activityid"),
            inverseJoinColumns = @JoinColumn(name = "usersocuid"))
    @ManyToMany(cascade = CascadeType.PERSIST)
    private List<UserSocu> attendees;

    /**
     * List of users who has declined the activity
     */
    @JoinTable(name = "DECLINEDACTIVITIES", joinColumns = @JoinColumn(name = "activityid"),
            inverseJoinColumns = @JoinColumn(name = "usersocuid"))
    @ManyToMany(cascade = CascadeType.PERSIST)
    private List<UserSocu> decliners;

    /**
     * Empty constructor
     */
    public Activity() {
    }

    /**
     * Constructor for creating an activity
     * @param activitytype type of the activity, ex After Work, Christmas party etc...
     * @param activitydate the date of which the activity takes place on
     * @param rsvpdate eventual RSVP date
     * @param createddate the date of which the activity was created
     * @param descriptionsocu a description of the activity
     * @param cancelled boolean describing if the activity is cancelled or not cancelled
     * @param createdby the user that has created the activity
     * @param locationname the name of the place of which the activity takes place at
     * @param locationaddress the address of the place of which the activity takes place at
     * @param company the company the activity is registered to and the user who created the activity works at
     */
    public Activity(String activitytype, LocalDateTime activitydate, LocalDateTime rsvpdate, LocalDateTime createddate, String descriptionsocu, boolean cancelled, UserSocu createdby, String locationname, String locationaddress, Company company) {
        this.activitytype = activitytype;
        this.activitydate = activitydate;
        this.rsvpdate = rsvpdate;
        this.createddate = createddate;
        this.descriptionsocu = descriptionsocu;
        this.cancelled = cancelled;
        this.createdby = createdby;
        this.locationname = locationname;
        this.locationaddress = locationaddress;
        this.company = company;
    }

    /**
     * ToString-method providing information about the activity
     * @return a string containing information about id, activitydate, RSVP-date, date the activity is created, description of the activity, if the activity is cancelled or not and location name and adress where the activity takes place.
     */
    @Override
    public String toString() {
        return "Activity{" +
                "id=" + id +
                ", activitydate=" + activitydate +
                ", rsvpdate=" + rsvpdate +
                ", createddate=" + createddate +
                ", descriptionsocu='" + descriptionsocu + '\'' +
                ", cancelled=" + cancelled +
                ", locationname='" + locationname + '\'' +
                ", locationaddress='" + locationaddress + '\'' +
                '}';
    }
}
