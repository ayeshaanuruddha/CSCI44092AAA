import React, { useState, useEffect } from 'react';

const API_URL = "http://localhost:8080/api";

function ResultsManagement() {
    const [students, setStudents] = useState([]);
    const [results, setResults] = useState([]);
    
    const [selectedStudentId, setSelectedStudentId] = useState('');
    const [selectedCourseId, setSelectedCourseId] = useState('');
    const [marks, setMarks] = useState('');

    // Fetch all students on component mount
    useEffect(() => {
        fetch(`${API_URL}/students`).then(res => res.json()).then(setStudents);
    }, []);

    // Fetch results for the selected student
    useEffect(() => {
        if (selectedStudentId) {
            fetch(`${API_URL}/results/student/${selectedStudentId}`)
                .then(res => res.json())
                .then(setResults);
        } else {
            setResults([]);
        }
    }, [selectedStudentId]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const resultData = {
            student: { id: selectedStudentId },
            course: { id: selectedCourseId },
            marks: parseFloat(marks)
        };

        fetch(`${API_URL}/results`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(resultData)
        })
        .then(res => res.json())
        .then(() => {
            // Refresh results for the current student
            fetch(`${API_URL}/results/student/${selectedStudentId}`).then(res => res.json()).then(setResults);
            setMarks('');
            setSelectedCourseId('');
        });
    };
    
    // Filter courses to only show those the selected student is enrolled in
    const selectedStudent = students.find(s => s.id === Number(selectedStudentId));
    const enrolledCourses = selectedStudent?.enrolledCourses || [];


    return (
        <div>
            <div className="form-container">
                <h2>Enter Student Result</h2>
                <form onSubmit={handleSubmit}>
                    <select value={selectedStudentId} onChange={(e) => setSelectedStudentId(e.target.value)} required>
                        <option value="">-- Select a Student --</option>
                        {students.map(student => (
                            <option key={student.id} value={student.id}>{student.name} ({student.studentId})</option>
                        ))}
                    </select>

                    <select value={selectedCourseId} onChange={(e) => setSelectedCourseId(e.target.value)} required disabled={!selectedStudentId}>
                        <option value="">-- Select an Enrolled Course --</option>
                        {enrolledCourses.map(course => (
                            <option key={course.id} value={course.id}>{course.code} - {course.title}</option>
                        ))}
                    </select>

                    <input
                        type="number"
                        step="0.01"
                        min="0"
                        max="100"
                        placeholder="Enter Marks (0-100)"
                        value={marks}
                        onChange={(e) => setMarks(e.target.value)}
                        required
                        disabled={!selectedCourseId}
                    />
                    <button type="submit">Save Result</button>
                </form>
            </div>

            <h2>Results for {selectedStudent?.name || '...'}</h2>
            <table>
                <thead>
                    <tr>
                        <th>Course Code</th>
                        <th>Course Title</th>
                        <th>Marks</th>
                        <th>Grade</th>
                        <th>GPV</th>
                    </tr>
                </thead>
                <tbody>
                    {results.map(result => (
                        <tr key={result.id}>
                            <td>{result.course.code}</td>
                            <td>{result.course.title}</td>
                            <td>{result.marks.toFixed(2)}</td>
                            <td>{result.grade}</td>
                            <td>{result.gradePointValue.toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ResultsManagement;