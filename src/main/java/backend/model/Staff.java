package backend.model;

import javax.xml.bind.annotation.XmlElement;

public class Staff {

    private int id;
    private String firstName;
    private String lastName;
    private String email;
    private int salary;

    public Staff(int id, String firstName, String lastName, String email, int salary) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.salary = salary;
    }

    public Staff() {}

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    @XmlElement(name="firstname")
    public String getFirstName() { return firstName; }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    @XmlElement(name="lastname")
    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public int getSalary() {
        return salary;
    }

    public void setSalary(int salary) {
        this.salary = salary;
    }

    @Override
    public String toString() {
        return this.id+" "+this.firstName +" "+this.lastName +" "+this.email+" "+this.salary;
    }
}
