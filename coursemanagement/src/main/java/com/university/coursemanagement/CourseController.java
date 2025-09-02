package com.university.coursemanagement;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/courses")
@CrossOrigin(origins = "*")
public class CourseController {

    @Autowired
    private CourseRepository repo;

    // GET all courses
    @GetMapping
    public List<Course> getAll() {
        return repo.findAll();
    }

    // POST a new course (CREATE)
    @PostMapping
    public Course createCourse(@RequestBody Course course) {
        return repo.save(course);
    }

    // PUT to update a course (UPDATE)
    @PutMapping("/{id}")
    public ResponseEntity<Course> updateCourse(@PathVariable Long id, @RequestBody Course courseDetails) {
        Optional<Course> optionalCourse = repo.findById(id);
        if (optionalCourse.isPresent()) {
            Course course = optionalCourse.get();
            course.setCode(courseDetails.getCode());
            course.setTitle(courseDetails.getTitle());
            return ResponseEntity.ok(repo.save(course));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // DELETE a course
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCourse(@PathVariable Long id) {
        if (repo.existsById(id)) {
            repo.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}