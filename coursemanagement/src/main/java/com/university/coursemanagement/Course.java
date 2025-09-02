package com.university.coursemanagement;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

import java.util.HashSet;
import java.util.Set;

@Entity
@Data
public class Course {

    @Id
    @GeneratedValue
    private Long id;

    private String title;
    private String code;

    // --- Studentrelationship ---
    @ManyToMany(mappedBy = "enrolledCourses")
    @JsonIgnore // Prevents infinite loops when sending data as JSON
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private Set<Student> enrolledStudents = new HashSet<>();
}