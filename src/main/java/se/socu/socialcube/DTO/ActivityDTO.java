package se.socu.socialcube.DTO;

import lombok.Getter;
import lombok.Setter;
import se.socu.socialcube.entities.Location;
import se.socu.socialcube.entities.UserSocu;

import java.sql.Time;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.OffsetDateTime;

@Getter
@Setter
public class ActivityDTO {

    private long id;
    private String activitytype;
    private LocalDateTime activitydate;
    private LocalDateTime rsvpdate;
    private String descriptionsocu;
    private long createdbyid;
    private String locationname;
    private String locationaddress;
    private long companyorganizationnumber;
}
