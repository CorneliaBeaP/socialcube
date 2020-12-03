package se.socu.socialcube.Entities;

import javax.persistence.*;
import java.io.Serializable;

@Entity(name = "USERSOCU")
public class UserSocu implements Serializable{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private int usertype;
    private String name;
    private String email;
    private String password;
    private String employmentnumber;
    private String department;

    public UserSocu() {
    }

    public UserSocu(String name) {
        this.name = name;
    }

    public UserSocu(int usertype, String name, String email, String password) {
        this.usertype = usertype;
        this.name = name;
        this.email = email;
        this.password = password;
    }

    public UserSocu(int usertype, String name, String email, String password, String employmentnumber, String department) {
        this.usertype = usertype;
        this.name = name;
        this.email = email;
        this.password = password;
        this.employmentnumber = employmentnumber;
        this.department = department;
    }

    public long getId() {
        return id;
    }

    public int getUsertype() {
        return usertype;
    }

    public void setUsertype(int usertype) {
        this.usertype = usertype;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmploymentnumber() {
        return employmentnumber;
    }

    public void setEmploymentnumber(String employmentNumber) {
        this.employmentnumber = employmentNumber;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }
}
