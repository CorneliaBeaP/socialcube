package se.socu.socialcube.DTO;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class ActivityDTO {

    private long id;
    private String activitytype;
    private LocalDateTime activitydate;
    private LocalDateTime rsvpdate;
    private LocalDateTime createddate;
    private String descriptionsocu;
    private long createdbyid;
    private String locationname;
    private String locationaddress;
    private long companyorganizationnumber;


    @Override
    public String toString() {
        return "ActivityDTO{" +
                "id=" + id +
                ", activitytype='" + activitytype + '\'' +
                ", activitydate=" + activitydate +
                ", rsvpdate=" + rsvpdate +
                ", createdDate=" + createddate +
                ", descriptionsocu='" + descriptionsocu + '\'' +
                ", createdbyid=" + createdbyid +
                ", locationname='" + locationname + '\'' +
                ", locationaddress='" + locationaddress + '\'' +
                ", companyorganizationnumber=" + companyorganizationnumber +
                '}';
    }
}
