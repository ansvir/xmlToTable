package backend.model;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlRootElement;
import java.util.List;
import java.util.stream.Collectors;

@XmlRootElement(name = "company")
@XmlAccessorType(XmlAccessType.FIELD)
public class Company {

    private List<Staff> staff;

    public Company(List<Staff> staff) {
        this.staff = staff;
    }

    public Company() {}

    public List<Staff> getStaff() {
        return this.staff;
    }

    public void setStaff(List<Staff> staff) {
        this.staff=staff;
    }

    @Override
    public String toString() {
        return this.staff.stream()
                .map(n -> String.valueOf(n))
                .collect(Collectors.joining(", ", "{", "}"));
    }
}
