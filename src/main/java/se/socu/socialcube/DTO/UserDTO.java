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
    private String password;
    private String employmentnumber;
    private String department;
}
