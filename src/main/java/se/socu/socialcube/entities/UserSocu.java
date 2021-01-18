package se.socu.socialcube.entities;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

/**
 * UserSocu is the entity used for any user.
 */
@Getter
@Setter
@Entity(name = "USERSOCU")
public class UserSocu implements Serializable {

    /**
     * The ID that autogenerates once the entity is saved in the database
     */
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
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
     * The password of the user, saved encrypted in database
     */
    private String password;
    /**
     * Eventual employment number of the user, not obligatory
     */
    private String employmentnumber;
    /**
     * Eventual department the user works at, not obligatory
     */
    private String department;

    /**
     * The company the user works at
     */
    @ManyToOne(fetch = FetchType.EAGER)
    private Company company;

    /**
     * A list of the activites created by the user
     */
    @OneToMany(cascade = CascadeType.PERSIST, mappedBy = "createdby")
    private List<Activity> createdactivities;

    /**
     * A list of activities which the user attended
     */
    @ManyToMany(cascade = CascadeType.PERSIST, mappedBy = "attendees")
    private List<Activity> attendedactivities;

    /**
     * A list of activities which the user declined
     */
    @ManyToMany(cascade = CascadeType.PERSIST, mappedBy = "decliners")
    private List<Activity> declinedactivities;


    /**
     * Empty constructor for creating an user
     */
    public UserSocu() {
    }

    /**
     * Constructor for creating an user with all information
     * @param usertype the usertype used to determine the users privileges
     * @param name The first and last name of the user
     * @param email the email of the user
     * @param password encrypted password of the user
     * @param employmentnumber eventual employment number of the user
     * @param department eventual department the user works at, not obligatory
     * @param company the company the user works at
     */
    public UserSocu(Usertype usertype, String name, String email, String password, String employmentnumber, String department, Company company) {
        this.usertype = usertype;
        this.name = name;
        this.email = email;
        this.password = password;
        this.employmentnumber = employmentnumber;
        this.department = department;
        this.company = company;
    }

    /**
     * ToString-method that prints id, usertype, name, email, password, emloyment number and department.
     * @return the string with information
     */
    @Override
    public String toString() {
        return "UserSocu{" +
                "id=" + id +
                ", usertype=" + usertype +
                ", name='" + name + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", employmentnumber='" + employmentnumber + '\'' +
                ", department='" + department + '\'' +
                '}';
    }
}