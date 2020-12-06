package se.socu.socialcube.entities;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

@Getter
@Setter
@Entity(name = "LOCATION")
public class Location implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    private String name;
    private String address;

    @OneToMany(cascade = CascadeType.PERSIST, mappedBy = "location")
    private List<Activity> activities;

    public Location() {
    }

    public Location(String name, String address) {
        this.name = name;
        this.address = address;
    }
}
