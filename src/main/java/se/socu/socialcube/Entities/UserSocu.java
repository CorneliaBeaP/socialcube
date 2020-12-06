package se.socu.socialcube.Entities;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

@Entity(name = "USERSOCU")
public class UserSocu implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private int usertype;
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
}