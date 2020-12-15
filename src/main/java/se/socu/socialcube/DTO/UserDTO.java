package se.socu.socialcube.DTO;

import lombok.Getter;
import lombok.Setter;
import se.socu.socialcube.entities.Usertype;

@Getter
@Setter
public class UserDTO {
    private long id;
    private Usertype usertype;
    private String name;
    private String email;
    private String employmentnumber;
    private String department;
    private long companyorganizationnumber;


    @Override
    public String toString() {
        return "UserDTO{" +
                "id=" + id +
                ", usertype=" + usertype +
                ", name='" + name + '\'' +
                ", email='" + email + '\'' +
                ", employmentnumber='" + employmentnumber + '\'' +
                ", department='" + department + '\'' +
                ", companyorganizationnumber=" + companyorganizationnumber +
                '}';
    }
}


