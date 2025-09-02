import React, { useState, useEffect } from 'react';
import './App.css';

const API_URL = "http://localhost:8080/api/courses";

function CourseManagement() {
    const [courses, setCourses] = useState([]);
    // State includes all fields
    const [formData, setFormData] = useState({ id: null, code: '', title: '', credits: '', department: '' });
    const [isEditing, setIsEditing] = useState(false);

    const fetchCourses = () => {
        fetch(API_URL)
            .then(res => res.json())
            .then(data => setCourses(data))
            .catch(error => console.error("Error fetching courses:", error));
    };

    useEffect(() => {
        fetchCourses();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const url = isEditing ? `${API_URL}/${formData.id}` : API_URL;
        const method = isEditing ? 'PUT' : 'POST';
        
        // Prepare data for sending
        const courseData = { 
            ...formData, 
            credits: parseInt(formData.credits, 10) 
        };

        fetch(url, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(courseData),
        }).then(() => {
            fetchCourses();
            resetForm();
        });
    };

    const handleEdit = (course) => {
        setIsEditing(true);
        // Pre-fill form with all data
        setFormData({ id: course.id, code: course.code, title: course.title, credits: course.credits, department: course.department });
    };

    const handleDelete = (id) => {
        fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
        }).then(() => fetchCourses());
    };

    const resetForm = () => {
        setIsEditing(false);
        setFormData({ id: null, code: '', title: '', credits: '', department: '' });
    };

    return (
        <div>
            <div className="form-container">
                <h2>{isEditing ? 'Edit Course' : 'Add New Course'}</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="code"
                        placeholder="Course Code (e.g., CSCI 41212)"
                        value={formData.code}
                        onChange={handleInputChange}
                        required
                    />
                    <input
                        type="text"
                        name="title"
                        placeholder="Course Title"
                        value={formData.title}
                        onChange={handleInputChange}
                        required
                    />
                    <input
                        type="text"
                        name="department"
                        placeholder="Department (e.g., IT)"
                        value={formData.department}
                        onChange={handleInputChange}
                        required
                    />
                    <input
                        type="number"
                        name="credits"
                        placeholder="Credits"
                        value={formData.credits}
                        onChange={handleInputChange}
                        required
                    />
                    <button type="submit">{isEditing ? 'Update Course' : 'Add Course'}</button>
                    {isEditing && <button type="button" onClick={resetForm} className="cancel-btn">Cancel</button>}
                </form>
            </div>

            <h2>Available Courses</h2>
            <table>
                <thead>
                    <tr>
                        <th>Code</th>
                        <th>Title</th>
                        <th>Department</th>
                        <th>Credits</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {courses.map(course => (
                        <tr key={course.id}>
                            <td>{course.code}</td>
                            <td>{course.title}</td>
                            <td>{course.department}</td>
                            <td>{course.credits}</td>
                            <td className="actions">
                                <button onClick={() => handleEdit(course)}>Edit</button>
                                <button onClick={() => handleDelete(course.id)} className="delete-btn">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default CourseManagement;