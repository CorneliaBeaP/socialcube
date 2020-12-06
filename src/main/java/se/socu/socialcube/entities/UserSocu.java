package se.socu.socialcube.entities;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

@Getter
@Setter
@Entity(name = "USERSOCU")
public class UserSocu implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    private Usertype usertype;
    private String name;
    private String email;
    private String password;
    private String employmentnumber;
    private String department;

    @ManyToOne(fetch = FetchType.LAZY)
    private Company company;

    @OneToMany(cascade = CascadeType.PERSIST, mappedBy = "createdby")
    private List<Activity> createdactivities;

//    TODO:
    @ManyToMany(cascade = CascadeType.PERSIST, mappedBy = "attendees")
    private List<Activity> attendedactivities;


    public UserSocu() {
    }

    public UserSocu(Usertype usertype, String name, String email, String password, String employmentnumber, String department, Company company) {
        this.usertype = usertype;
        this.name = name;
        this.email = email;
        this.password = password;
        this.employmentnumber = employmentnumber;
        this.department = department;
        this.company = company;
    }



}