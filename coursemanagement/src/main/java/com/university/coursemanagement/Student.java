package com.university.coursemanagement;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;
import java.util.Set;
import java.util.HashSet;

@Entity
@Data
public class Student {

    @Id
    @GeneratedValue
    private Long id;

    private String name;
    private String email;
    private String academicYear;
    private String country;
    private String city;
    private String employeeId;
    private String jobTitle;
    private String department;

    @ElementCollection
    private Set<String> interests = new HashSet<>();

    @ManyToMany
    @JoinTable(
        name = "student_courses",
        joinColumns = @JoinColumn(name = "student_id"),
        inverseJoinColumns = @JoinColumn(name = "course_id")
    )
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private Set<Course> enrolledCourses = new HashSet<>();

    @Transient // Tells JPA not to create a database column for this field
    private Double gpa;
}