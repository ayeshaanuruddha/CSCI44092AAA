package com.university.coursemanagement;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Result {

    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne
    @JoinColumn(name = "student_id")
    private Student student;

    @ManyToOne
    @JoinColumn(name = "course_id")
    private Course course;

    private double marks;
    private String grade;
    private double gradePointValue; // --- ADDED THIS FIELD ---
}