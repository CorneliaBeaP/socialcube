package se.socu.socialcube.Entities;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity(name = "COMPANY")
public class Company implements Serializable {

    @Id
    private long organizationnumber;
    private String name;

    @OneToMany(cascade = CascadeType.PERSIST, mappedBy = "company")
    private List<UserSocu> employees = new ArrayList<>();

    public Company() {
    }

    public Company(long organizationnumber, String name) {
        this.organizationnumber = organizationnumber;
        this.name = name;
    }
}
