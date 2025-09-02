import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

const API_URL = "http://localhost:8080/api";

// Style for the modal
const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '500px',
        maxHeight: '80vh',
        display: 'flex',
        flexDirection: 'column'
    },
};

Modal.setAppElement('#root'); // Accessibility feature

function EnrollmentModal({ isOpen, onRequestClose, student }) {
    const [courses, setCourses] = useState([]);
    const [selectedCourses, setSelectedCourses] = useState(new Set());

    // Fetch all available courses when the modal opens
    useEffect(() => {
        if (student) {
            fetch(`${API_URL}/courses`)
                .then(res => res.json())
                .then(data => setCourses(data))
                .catch(error => console.error("Error fetching courses:", error));
            
            // Pre-select the courses the student is already enrolled in
            const enrolledIds = new Set(student.enrolledCourses.map(c => c.id));
            setSelectedCourses(enrolledIds);
        }
    }, [student]);

    const handleCheckboxChange = (courseId) => {
        setSelectedCourses(prevSelected => {
            const newSelected = new Set(prevSelected);
            if (newSelected.has(courseId)) {
                newSelected.delete(courseId);
            } else {
                newSelected.add(courseId);
            }
            return newSelected;
        });
    };

    const handleEnroll = () => {
        const enrollPromises = Array.from(selectedCourses).map(courseId => {
            // Check if the student is NOT already enrolled before enrolling
            if (!student.enrolledCourses.some(c => c.id === courseId)) {
                return fetch(`${API_URL}/students/${student.id}/courses/${courseId}`, { method: 'POST' });
            }
            return null;
        }).filter(p => p !== null);

        // For now, we will not handle un-enrollment to keep it simple.
        // A full implementation would require another set of API calls for courses that were unchecked.

        Promise.all(enrollPromises)
            .then(() => {
                onRequestClose(true); // Close modal and signal a refresh
            })
            .catch(error => console.error("Error during enrollment:", error));
    };

    if (!student) return null;

    return (
        <Modal isOpen={isOpen} onRequestClose={() => onRequestClose(false)} style={customStyles} contentLabel="Enrollment Modal">
            <h2>Enroll {student.name} in Courses</h2>
            <div className="course-list">
                {courses.map(course => (
                    <div key={course.id} className="course-item">
                        <label>
                            <input
                                type="checkbox"
                                checked={selectedCourses.has(course.id)}
                                onChange={() => handleCheckboxChange(course.id)}
                            />
                            {course.code} - {course.title}
                        </label>
                    </div>
                ))}
            </div>
            <div className="modal-actions">
                <button onClick={handleEnroll}>Save Enrollments</button>
                <button onClick={() => onRequestClose(false)} className="cancel-btn">Cancel</button>
            </div>
        </Modal>
    );
}

export default EnrollmentModal;