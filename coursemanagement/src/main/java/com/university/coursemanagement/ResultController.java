package com.university.coursemanagement;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/results")
@CrossOrigin(origins = "*")
public class ResultController {

    @Autowired
    private ResultRepository resultRepository;

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private CourseRepository courseRepository;

    // Get all results for a specific student
    @GetMapping("/student/{studentId}")
    public List<Result> getResultsForStudent(@PathVariable Long studentId) {
        return resultRepository.findByStudentId(studentId);
    }

    // Add or update a result
    @PostMapping
    public ResponseEntity<Result> addOrUpdateResult(@RequestBody Result resultData) {
        // Ensure student and course are attached to the result object
        Student student = studentRepository.findById(resultData.getStudent().getId()).orElse(null);
        Course course = courseRepository.findById(resultData.getCourse().getId()).orElse(null);

        if (student == null || course == null) {
            return ResponseEntity.badRequest().build();
        }

        resultData.setStudent(student);
        resultData.setCourse(course);

        // Calculate Grade and GPV based on marks
        calculateGradeAndGpv(resultData);

        Result savedResult = resultRepository.save(resultData);
        return ResponseEntity.ok(savedResult);
    }

    // grading system following FCT Student's Handbook
    private void calculateGradeAndGpv(Result result) {
        double marks = result.getMarks();
        if (marks >= 85) {
            result.setGrade("A+");
            result.setGradePointValue(4.0);
        } else if (marks >= 70) {
            result.setGrade("A");
            result.setGradePointValue(4.0);
        } else if (marks >= 65) {
            result.setGrade("A-");
            result.setGradePointValue(3.7);
        } else if (marks >= 60) {
            result.setGrade("B+");
            result.setGradePointValue(3.3);
        } else if (marks >= 55) {
            result.setGrade("B");
            result.setGradePointValue(3.0);
        } else if (marks >= 50) {
            result.setGrade("B-");
            result.setGradePointValue(2.7);
        } else if (marks >= 45) {
            result.setGrade("C+");
            result.setGradePointValue(2.3);
        } else if (marks >= 40) {
            result.setGrade("C");
            result.setGradePointValue(2.0);
        } else if (marks >= 35) {
            result.setGrade("C-");
            result.setGradePointValue(1.7);
        } else if (marks >= 30) {
            result.setGrade("D+");
            result.setGradePointValue(1.3);
        } else if (marks >= 25) {
            result.setGrade("D");
            result.setGradePointValue(1.0);
        } else {
            result.setGrade("E");
            result.setGradePointValue(0.0);
        }
    }
}