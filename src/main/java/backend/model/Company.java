package backend.model;

import javax.xml.bind.annotation.XmlRootElement;
import java.util.List;
import java.util.stream.Collectors;

@XmlRootElement(name = "Company")
public class Company {

    private List<Staff> staff;

    public Company(List<Staff> staff) {
        this.staff = staff;
    }

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
