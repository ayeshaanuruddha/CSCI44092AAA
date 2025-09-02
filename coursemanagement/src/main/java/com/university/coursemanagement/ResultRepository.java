package com.university.coursemanagement;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ResultRepository extends JpaRepository<Result, Long> {
    // Find all results for a specific student
    List<Result> findByStudentId(Long studentId);
}