package se.socu.socialcube.entities;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@Entity(name = "ACTIVITY")
public class Activity implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    private String activitytype;
    private LocalDateTime activitydate;
    private LocalDateTime rsvpdate;
    private String descriptionsocu;

    @ManyToOne(fetch = FetchType.LAZY)
    private UserSocu createdby;

    @ManyToOne(fetch = FetchType.LAZY)
    private Location location;

    @ManyToOne(fetch = FetchType.LAZY)
    private Company company;

    @JoinTable(name = "ATTENDEDACTIVITIES", joinColumns = @JoinColumn(name = "activity_id"),
            inverseJoinColumns = @JoinColumn(name = "usersocu_id"))
    @ManyToMany(cascade = CascadeType.PERSIST)
    private List<UserSocu> attendees;

    public Activity() {
    }

    public Activity(String activitytype, LocalDateTime activitydate, LocalDateTime rsvpdate, String descriptionsocu, UserSocu createdby, Location location, Company company) {
        this.activitytype = activitytype;
        this.activitydate = activitydate;
        this.rsvpdate = rsvpdate;
        this.descriptionsocu = descriptionsocu;
        this.createdby = createdby;
        this.location = location;
        this.company = company;
    }
}
