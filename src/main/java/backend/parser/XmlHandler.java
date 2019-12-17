package backend.parser;

import backend.model.Company;
import backend.model.Staff;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Component;
import org.xml.sax.helpers.DefaultHandler;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Marshaller;
import javax.xml.bind.Unmarshaller;
import java.io.*;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class XmlHandler extends DefaultHandler {

    private static final Logger LOG = Logger.getLogger(XmlHandler.class);

    public Company xmlToStaff(String path) throws JAXBException, IOException {
//        XmlMapper xmlMapper = new XmlMapper();
//        File file = new File(path);
//        String xml="";
//        BufferedReader br = new BufferedReader(new FileReader(file));
//        String st;
//        while ((st = br.readLine()) != null) xml+=st;
//        System.out.println(xml);
//        Company c = xmlMapper.readValue(file, Company.class);
        File file = new File(path);
        JAXBContext jaxbContext = JAXBContext.newInstance(Company.class);
        Unmarshaller unMar = jaxbContext.createUnmarshaller();
        Company c = (Company) unMar.unmarshal(file);
        return c;
    }

    public Company pojoToXml(List<Staff> staff, String filePath) throws JAXBException, IOException {
        JAXBContext context = JAXBContext.newInstance(Company.class);
        Marshaller mar= context.createMarshaller();
        mar.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, Boolean.TRUE);
        Company c=new Company(staff);
        mar.marshal(c, new File(filePath));
        return c;
    }

//    public Company pojoToXml(List<Staff> staff, String filePath) throws IOException {
//        XmlMapper xmlMapper = new XmlMapper();
//        Company c = new Company(staff);
//        xmlMapper.writeValue(new File(filePath), c);
//        return c;
//    }
}
