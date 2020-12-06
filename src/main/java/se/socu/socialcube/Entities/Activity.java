package se.socu.socialcube.Entities;

import javassist.LoaderClassPath;

import javax.persistence.*;
import java.io.Serializable;
import java.sql.Time;
import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@Entity(name = "ACTIVITY")
public class Activity implements Serializable {

    @Id
    private long id;
    private String activitytype;
    private Timestamp activitydate;
    private Timestamp rsvpdate;
    private String descriptionsocu;

    @ManyToOne(fetch = FetchType.LAZY)
    private UserSocu createdby;

    @ManyToOne(fetch = FetchType.LAZY)
    private Location location;

    @JoinTable(name = "ATTENDEDACTIVITIES", joinColumns = @JoinColumn(name = "activity_id"),
            inverseJoinColumns = @JoinColumn(name = "usersocu_id"))
    @ManyToMany(cascade = CascadeType.PERSIST)
    private List<UserSocu> attendees;

    public Activity() {
    }

}
