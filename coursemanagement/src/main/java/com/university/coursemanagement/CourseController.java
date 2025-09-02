package com.university.coursemanagement;

// Repo class to handle database operations for Course entity.
import com.university.coursemanagement.Course;
import com.university.coursemanagement.CourseRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/courses")
@CrossOrigin(origins = "http://localhost:3000")
public class CourseController {

    @Autowired
    private CourseRepository repo;

    @GetMapping
    public List<Course> getAll() {
        return repo.findAll();
    }
}