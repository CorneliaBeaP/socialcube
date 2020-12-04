package se.socu.socialcube.Entities;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import java.io.Serializable;
import java.util.List;

@Getter
@Setter
@Entity(name = "COMPANY")
public class Company implements Serializable {

    @Id
    private long organizationnumber;
    private String name;

//    @OneToMany(cascade = CascadeType.PERSIST, mappedBy = "COMPANY")
//    private List<UserSocu> employees;

    public Company() {
    }

    public Company(long organizationnumber, String name) {
        this.organizationnumber = organizationnumber;
        this.name = name;
    }
}
