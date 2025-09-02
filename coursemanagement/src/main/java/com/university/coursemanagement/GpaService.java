package com.university.coursemanagement;

import org.springframework.stereotype.Service;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;

@Service
public class GpaService {

    public double calculateGpa(List<Result> results) {
        if (results == null || results.isEmpty()) {
            return 0.0;
        }

        double totalCreditWeightedGpv = 0.0;
        int totalCredits = 0;

        for (Result result : results) {
            int credits = result.getCourse().getCredits();
            totalCreditWeightedGpv += result.getGradePointValue() * credits;
            totalCredits += credits;
        }

        if (totalCredits == 0) {
            return 0.0;
        }

        double gpa = totalCreditWeightedGpv / totalCredits;

        // Round to two decimal places as per the requirement
        BigDecimal bd = new BigDecimal(Double.toString(gpa));
        bd = bd.setScale(2, RoundingMode.HALF_UP);
        return bd.doubleValue();
    }
}