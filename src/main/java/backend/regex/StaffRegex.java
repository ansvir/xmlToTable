package backend.regex;

import backend.model.Staff;

import java.util.List;
import java.util.regex.Pattern;

public class StaffRegex {

    private static final String VALID_NAME = "^[A-Z][a-z]{1,40}$";
    private static final String VALID_EMAIL = "^[a-zA-Z0-9_!#$%&’*+/=?`{|}~^.-]+@[a-zA-Z0-9.-]+$";

    public static boolean checkValidation(Staff staff) {
        return (
                Pattern.matches(VALID_NAME, staff.getFirstName()) &&
                Pattern.matches(VALID_NAME, staff.getLastName()) &&
                Pattern.matches(VALID_EMAIL, staff.getEmail())
                );
    }

    public static boolean checkValidation(List<Staff> staff) {
        for(Staff s: staff) {
            if(!checkValidation(s)) return false;
        }

        return true;

    }
}
