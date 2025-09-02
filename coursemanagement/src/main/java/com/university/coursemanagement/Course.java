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
    private String department;
    private int credits; 

    @ManyToMany(mappedBy = "enrolledCourses")
    @JsonIgnore
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private Set<Student> enrolledStudents = new HashSet<>();
}