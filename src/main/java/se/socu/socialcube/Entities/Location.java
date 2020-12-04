package se.socu.socialcube.Entities;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

@Entity(name = "LOCATION")
public class Location implements Serializable {

    @Id
    private long id;
    private String name;
    private String address;

//    @OneToMany(cascade = CascadeType.PERSIST, mappedBy = "LOCATION")
//    private List<Activity> activities;

    public Location() {
    }
}
