package backend.controller;

import backend.model.Company;
import backend.model.Staff;
import backend.parser.XmlHandler;
import backend.regex.StaffRegex;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.xml.bind.JAXBException;
import java.io.IOException;
import java.util.List;

@CrossOrigin(origins="*")
@RestController
public class AppController {

    @Autowired
    XmlHandler xh;

    private static final Logger LOG = Logger.getLogger(AppController.class);

    @RequestMapping(value="/xml/getXml", params="path", method = RequestMethod.GET)
    public Company getStaff(@RequestParam("path") String filePath) {
        try {
            Company c = xh.xmlToStaff(filePath);
            if(StaffRegex.checkValidation(c.getStaff())) {
                return c;
            } else {
                LOG.error("'Staff' didn't pass the validation");
                return null;
            }
        }
        catch (JAXBException exc) {
            LOG.error("JAXBException or IOException");
            return null;
        }
    }

    @RequestMapping(value="/xml/updateXml", params="path", method=RequestMethod.POST)
    public Company postStaff(@RequestParam("path") String filePath, @RequestBody List<Staff> staff) {
        try {
            return xh.pojoToXml(staff, filePath);
        } catch (JAXBException exc) {
            LOG.error("JAXBException or IOException");
            return null;
        }
    }
}
