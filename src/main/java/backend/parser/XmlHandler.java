package backend.parser;

import backend.model.Staff;
import org.springframework.stereotype.Component;
import org.xml.sax.Attributes;
import org.xml.sax.SAXException;
import org.xml.sax.helpers.DefaultHandler;

import javax.xml.parsers.ParserConfigurationException;
import javax.xml.parsers.SAXParser;
import javax.xml.parsers.SAXParserFactory;
import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class XmlHandler extends DefaultHandler {

    private String id, firstName, lastName, email, salary, lastElementName;
    private List<Staff> staff=new ArrayList<>();

    public List<Staff> xmlToStaff(String path) throws ParserConfigurationException, SAXException, IOException {
        SAXParserFactory factory = SAXParserFactory.newInstance();
        SAXParser parser = factory.newSAXParser();

        XmlHandler handler=new XmlHandler();

        parser.parse(new File(path), handler);

        return handler.getStaff();
    }

    public File staffToXml(Staff[] staff) {
        return new File("");
    }

    @Override
    public void startElement(String uri, String localName, String qName, Attributes attributes) throws SAXException {
        lastElementName=qName;
    }

    @Override
    public void characters(char[] ch, int start, int length) throws SAXException {
        String information = new String(ch, start, length);

        information = information.replace("\n", "").trim();

        if (!information.isEmpty()) {
            if (lastElementName.equals("id"))
                id = information;
            if (lastElementName.equals("firstname"))
                firstName= information;
            if (lastElementName.equals("lastname"))
                lastName = information;
            if (lastElementName.equals("email"))
                email = information;
            if (lastElementName.equals("salary"))
                salary = information;
        }
    }

    @Override
    public void endElement(String uri, String localName, String qName) throws SAXException {
        if ( (id != null && !id.isEmpty()) &&
                (firstName != null && !firstName.isEmpty()) &&
                (lastName != null && !lastName.isEmpty()) &&
                (email != null && !email.isEmpty()) &&
                (salary != null && !salary.isEmpty())){
                    staff.add(new Staff(Integer.parseInt(id), firstName, lastName, email, Integer.parseInt(salary)));
                    id = null;
                    firstName = null;
                    lastName = null;
                    email = null;
                    salary = null;
        }
    }

    public List<Staff> getStaff() {
        return this.staff;
    }

    public void setStaff(List<Staff> staff) {this.staff=staff;}

    @Override
    public String toString() {
        return this.staff.stream()
                .map(n -> String.valueOf(n))
                .collect(Collectors.joining(", ", "{", "}"));
    }
}
