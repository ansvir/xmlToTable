package backend.controller;

import backend.model.Staff;
import backend.parser.XmlHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.xml.sax.SAXException;

import javax.xml.parsers.ParserConfigurationException;
import java.io.IOException;
import java.util.List;

@CrossOrigin(origins="*")
@RestController
public class AppController {
//    @Autowired
//    private Company company;
//    @Autowired
//    private Staff staff;
//
//    private String filePath;
//    @RequestMapping(value = "/path", method = RequestMethod.POST)
//    public void setPath(@RequestBody String filePath) {
//        this.filePath=filePath;
//    }
//
//    @RequestMapping(value="updateXml", method=RequestMethod.POST)
//    public void updateXml(@RequestBody Company company) {
//        this.company=company;
//    }

    @Autowired
    XmlHandler xh;

    @RequestMapping(value="/xml/getXml", params="path", method = RequestMethod.GET)
    public ResponseEntity<?> getStaff(@RequestParam("path") String filePath) {
        System.out.println(filePath);
        try {
            return new ResponseEntity<List<Staff>>(xh.xmlToStaff(filePath), HttpStatus.OK);
        }
        catch (ParserConfigurationException | SAXException | IOException exc) {
            exc.printStackTrace();
            return new ResponseEntity<String>("Error occurred", HttpStatus.NO_CONTENT);
        }
    }

    @RequestMapping(value="/xml/updateXml", params="path", method=RequestMethod.POST)
    public ResponseEntity<?> postStaff(@RequestParam("path") String filePath, @RequestBody Staff[] staff) {
        return new ResponseEntity<String>("1",HttpStatus.OK);
    }
}
