import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import CourseManagement from './CourseManagement';
import StudentManagement from './StudentManagement';
import ResultsManagement from './ResultsManagement'; 
import './App.css';

function App() {
    return (
        <Router>
            <div className="App">
                <header className="App-header">
                    <h1>University Course Management</h1>
                    <nav>
                        <NavLink to="/courses">Manage Courses</NavLink>
                        <NavLink to="/students">Manage Students</NavLink>
                        <NavLink to="/results">Manage Results</NavLink>
                    </nav>
                </header>
                <main>
                    <Routes>
                        <Route path="/courses" element={<CourseManagement />} />
                        <Route path="/students" element={<StudentManagement />} />
                        <Route path="/results" element={<ResultsManagement />} />
                        <Route path="/" element={<CourseManagement />} /> {/* Default page */}
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;