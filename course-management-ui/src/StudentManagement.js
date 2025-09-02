import React, { useState, useEffect } from 'react';
import EnrollmentModal from './EnrollmentModal'; // Import the modal
import './App.css';

const API_URL = "http://localhost:8080/api/students";

function StudentManagement() {
    const [students, setStudents] = useState([]);
    const [formData, setFormData] = useState({
        id: null, name: '', email: '', studentId: '', academicYear: '2024/2025', country: '', city: '', interests: ''
    });
    const [isEditing, setIsEditing] = useState(false);
    
    // State for the modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState(null);

    const academicYears = ["2024/2025", "2023/2024", "2022/2023", "2021/2022", "2020/2021"];

    const fetchStudents = () => {
        fetch(API_URL)
            .then(res => res.json())
            .then(data => setStudents(data))
            .catch(error => console.error("Error fetching students:", error));
    };

    useEffect(() => {
        fetchStudents();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const url = isEditing ? `${API_URL}/${formData.id}` : API_URL;
        const method = isEditing ? 'PUT' : 'POST';

        const studentData = { ...formData, interests: formData.interests.split(',').map(item => item.trim()).filter(item => item) };

        fetch(url, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(studentData),
        }).then(() => {
            fetchStudents();
            resetForm();
        });
    };

    const handleEdit = (student) => {
        setIsEditing(true);
        setFormData({ ...student, interests: student.interests.join(', ') });
    };

    const handleDelete = (id) => {
        fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
        }).then(() => fetchStudents());
    };
    
    // --- Modal Functions ---
    const openEnrollmentModal = (student) => {
        setSelectedStudent(student);
        setIsModalOpen(true);
    };

    const closeEnrollmentModal = (shouldRefresh) => {
        setIsModalOpen(false);
        setSelectedStudent(null);
        if (shouldRefresh) {
            fetchStudents(); // Re-fetch students to show updated enrollment data
        }
    };

    const resetForm = () => {
        setIsEditing(false);
        setFormData({ id: null, name: '', email: '', studentId: '', academicYear: '2024/2025', country: '', city: '', interests: '' });
    };

    return (
        <div>
            <div className="form-container">
                <h2>{isEditing ? 'Edit Student' : 'Add New Student'}</h2>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleInputChange} required />
                    <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleInputChange} required />
                    <input type="text" name="studentId" placeholder="Student ID (e.g., CS/2018/004)" value={formData.studentId} onChange={handleInputChange} required />
                    <select name="academicYear" value={formData.academicYear} onChange={handleInputChange}>
                        {academicYears.map(year => <option key={year} value={year}>{year}</option>)}
                    </select>
                    <input type="text" name="country" placeholder="Country" value={formData.country} onChange={handleInputChange} />
                    <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleInputChange} />
                    <textarea name="interests" placeholder="Interests (comma-separated)" value={formData.interests} onChange={handleInputChange}></textarea>
                    <button type="submit">{isEditing ? 'Update Student' : 'Add Student'}</button>
                    {isEditing && <button type="button" onClick={resetForm} className="cancel-btn">Cancel</button>}
                </form>
            </div>

            <h2>Registered Students</h2>
            <table>
                <thead>
                    <tr>
                        <th>Student ID</th>
                        <th>Name</th>
                        <th>Enrolled Courses</th>
                        <th>GPA</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map(student => (
                        <tr key={student.id}>
                            <td>{student.studentId}</td>
                            <td>{student.name}</td>
                            <td>{student.enrolledCourses.length}</td>
                            <td>{student.gpa ? student.gpa.toFixed(2) : 'N/A'}</td>
                            <td className="actions">
                                <button onClick={() => openEnrollmentModal(student)}>Enroll</button>
                                <button onClick={() => handleEdit(student)}>Edit</button>
                                <button onClick={() => handleDelete(student.id)} className="delete-btn">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <EnrollmentModal
                isOpen={isModalOpen}
                onRequestClose={closeEnrollmentModal}
                student={selectedStudent}
            />
        </div>
    );
}

export default StudentManagement;
