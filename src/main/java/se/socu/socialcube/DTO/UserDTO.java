package se.socu.socialcube.DTO;

import lombok.Getter;
import lombok.Setter;
import se.socu.socialcube.entities.Usertype;

/**
 * Data Transfer Object for sending information about an user to and from the client
 */
@Getter
@Setter
public class UserDTO {

    /**
     * The users ID from the database
     */
    private long id;

    /**
     * The usertype used to determine the users privileges
     */
    private Usertype usertype;

    /**
     * The first and last name of the user
     */
    private String name;

    /**
     * The email of the user
     */
    private String email;

    /**
     * Eventual employment number of the user, not obligatory
     */
    private String employmentnumber;

    /**
     * Eventual department the user works at, not obligatory
     */
    private String department;

    /**
     * The organization number of the company the user works at
     */
    private long companyorganizationnumber;

    /**
     * Jason Web Token that is provided after an user logs in
     */
    private String token;

    /**
     * The name of the company the user works at
     */
    private String companyname;

    /**
     * ToString-method that prints id, usertype, name, email, emloyment number, department, the organization number of the company the user works at and the users last created JWT.
     * @return the string with information
     */
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
                ", token='" + token + '\'' +
                '}';
    }
}


