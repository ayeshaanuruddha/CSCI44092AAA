package com.university.coursemanagement;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Data;

@Entity //Tells JPA that this class is a database table.
@Data   // Lombok annotation to automatically create getters, setters, etc.

public class Course {
  
    @Id // Marks this field as the primary key.
    @GeneratedValue //Automatically generates the ID value.
    private Long id; // 

    private String title; // CourseName
    private String code;  // CourseCode  
}
