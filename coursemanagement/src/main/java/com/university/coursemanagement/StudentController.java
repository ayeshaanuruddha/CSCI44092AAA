package com.university.coursemanagement;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/students")
@CrossOrigin(origins = "*")
public class StudentController {

    @Autowired
    private StudentRepository studentRepository;
    @Autowired
    private CourseRepository courseRepository;
    @Autowired
    private ResultRepository resultRepository;
    @Autowired
    private GpaService gpaService;

    @GetMapping
    public List<Student> getAllStudents() {
        List<Student> students = studentRepository.findAll();
        // Calculate GPA for each student before returning the list
        students.forEach(student -> {
            List<Result> results = resultRepository.findByStudentId(student.getId());
            student.setGpa(gpaService.calculateGpa(results));
        });
        return students;
    }

    @PostMapping
    public Student createStudent(@RequestBody Student student) {
        return studentRepository.save(student);
    }

    @PutMapping("/{id}") //Following ekel.kln.ac.lk
    public ResponseEntity<Student> updateStudent(@PathVariable Long id, @RequestBody Student studentDetails) {
        Optional<Student> optionalStudent = studentRepository.findById(id);
        if (optionalStudent.isPresent()) {
            Student student = optionalStudent.get();
            student.setName(studentDetails.getName());
            student.setEmail(studentDetails.getEmail());
            student.setAcademicYear(studentDetails.getAcademicYear());
            student.setCountry(studentDetails.getCountry());
            student.setCity(studentDetails.getCity());
            student.setInterests(studentDetails.getInterests());
            
            
            return ResponseEntity.ok(studentRepository.save(student));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteStudent(@PathVariable Long id) {
        if (studentRepository.existsById(id)) {
            studentRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    @PostMapping("/{studentId}/courses/{courseId}")
    public ResponseEntity<Student> enrollStudentInCourse(@PathVariable Long studentId, @PathVariable Long courseId) {
        Optional<Student> optionalStudent = studentRepository.findById(studentId);
        Optional<Course> optionalCourse = courseRepository.findById(courseId);

        if (optionalStudent.isPresent() && optionalCourse.isPresent()) {
            Student student = optionalStudent.get();
            Course course = optionalCourse.get();

            student.getEnrolledCourses().add(course);
            studentRepository.save(student);

            return ResponseEntity.ok(student);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}