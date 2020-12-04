package se.socu.socialcube.Entities;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Entity(name = "ACTIVITY")
public class Activity implements Serializable {

    @Id
    private long id;
    private String type;
    private Date activitydate;
    private Date rsvpdate;
    private String description;

//    @ManyToOne(fetch = FetchType.LAZY)
//    UserSocu userSocu;
//
//    @ManyToOne(fetch = FetchType.LAZY)
//    private Location location;

    public Activity() {
    }

}
