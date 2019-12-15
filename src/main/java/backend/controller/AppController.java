package backend.controller;

import backend.model.Company;
import backend.model.Staff;
import backend.parser.XmlHandler;
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

    @RequestMapping(value="/xml/getXml", params="path", method = RequestMethod.GET)
    public ResponseEntity<?> getStaff(@RequestParam("path") String filePath) {
        try {
            return new ResponseEntity<List<Staff>>(xh.xmlToStaff(filePath), HttpStatus.OK);
        }
        catch (ParserConfigurationException | SAXException | IOException exc) {
            exc.printStackTrace();
            return new ResponseEntity<String>("Error occurred", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value="/xml/updateXml", params="path", method=RequestMethod.POST)
    public ResponseEntity<?> postStaff(@RequestParam("path") String filePath, @RequestBody List<Staff> staff) {
        try {
            return new ResponseEntity<Company>(xh.pojoToXml(staff, filePath), HttpStatus.OK);
        } catch (JAXBException | IOException exc) {
            exc.printStackTrace();
            return new ResponseEntity<String>("error occurred", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
