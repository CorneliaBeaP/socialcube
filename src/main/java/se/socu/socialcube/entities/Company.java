package se.socu.socialcube.entities;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

/**
 * The entity used for the company of which an user works.
 */
@Getter
@Setter
@Entity(name = "COMPANY")
public class Company implements Serializable {

    /**
     * The organization number which is used also as an id for the company
     */
    @Id
    private long organizationnumber;

    /**
     * The name of the company
     */
    private String name;

    /**
     * A list which contains the users employed by and registered to the company
     */
    @OneToMany(cascade = CascadeType.PERSIST, mappedBy = "company")
    private List<UserSocu> employees = new ArrayList<>();

    /**
     * Empty constructor
     */
    public Company() {
    }

    /**
     * Constructor for creating a company instantly
     * @param organizationnumber the organization number of the company
     * @param name the name of the company
     */
    public Company(long organizationnumber, String name) {
        this.organizationnumber = organizationnumber;
        this.name = name;
    }

    /**
     * ToString-method that provides a string with information about the company
     * @return a string with information about the organization number and name of the company
     */
    @Override
    public String toString() {
        return "Company{" +
                "organizationnumber=" + organizationnumber +
                ", name='" + name + '\'' +
                '}';
    }
}
