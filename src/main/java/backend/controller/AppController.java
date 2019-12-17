package backend.controller;

import backend.model.Company;
import backend.model.Staff;
import backend.parser.XmlHandler;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.xml.sax.SAXException;

import javax.xml.bind.JAXBException;
import javax.xml.parsers.ParserConfigurationException;
import java.io.IOException;
import java.util.List;

@CrossOrigin(origins="*")
@RestController
public class AppController {

    @Autowired
    XmlHandler xh;

    private static final Logger log = Logger.getLogger(AppController.class);

    @RequestMapping(value="/xml/getXml", params="path", method = RequestMethod.GET)
    public List<Staff> getStaff(@RequestParam("path") String filePath) {
        try {
            return xh.xmlToStaff(filePath);
        }
        catch (ParserConfigurationException | SAXException | IOException exc) {
            log.error(exc.toString());
            return null;
        }
    }

    @RequestMapping(value="/xml/updateXml", params="path", method=RequestMethod.POST)
    public Company postStaff(@RequestParam("path") String filePath, @RequestBody List<Staff> staff) {
        try {
            return xh.pojoToXml(staff, filePath);
        } catch (IOException exc) {
            log.error(exc.toString());
            return null;
        }
    }
}
