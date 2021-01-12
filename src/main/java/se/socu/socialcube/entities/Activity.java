package se.socu.socialcube.entities;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;
import java.sql.Time;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.OffsetDateTime;
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
    private LocalDateTime createddate;
    private String descriptionsocu;
    private boolean cancelled;

    @ManyToOne(fetch = FetchType.LAZY)
    private UserSocu createdby;

    private String locationname;
    private String locationaddress;

    @ManyToOne(fetch = FetchType.LAZY)
    private Company company;

    @JoinTable(name = "ATTENDEDACTIVITIES", joinColumns = @JoinColumn(name = "activityid"),
            inverseJoinColumns = @JoinColumn(name = "usersocuid"))
    @ManyToMany(cascade = CascadeType.PERSIST)
    private List<UserSocu> attendees;

    @JoinTable(name = "DECLINEDACTIVITIES", joinColumns = @JoinColumn(name = "activityid"),
            inverseJoinColumns = @JoinColumn(name = "usersocuid"))
    @ManyToMany(cascade = CascadeType.PERSIST)
    private List<UserSocu> decliners;

    public Activity() {
    }

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

    @Override
    public String toString() {
        return "Activity{" +
                "id=" + id +
                ", activitytype='" + activitytype + '\'' +
                ", activitydate=" + activitydate +
                ", rsvpdate=" + rsvpdate +
                ", createddate=" + createddate +
                ", descriptionsocu='" + descriptionsocu + '\'' +
                ", cancelled=" + cancelled +
                ", createdby=" + createdby +
                ", locationname='" + locationname + '\'' +
                ", locationaddress='" + locationaddress + '\'' +
                ", company=" + company +
                ", attendees=" + attendees +
                '}';
    }
}
