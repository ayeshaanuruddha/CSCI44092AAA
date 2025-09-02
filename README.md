# CSCI44092 Practical Assignment

Project Theme: University Course Management System to manage course offerings, student registrations, and results. 
 CS/2018/004 Anuruddha W. A. U.
 
Core Features
Course Management: Full CRUD (Create, Read, Update, Delete) functionality for university courses, including details like department and credits.

Student Management: Full CRUD functionality for student profiles with detailed information.

Course Enrollment: A user-friendly interface to enroll students in multiple available courses.

Results & GPA Management: A dedicated portal to enter student marks for enrolled courses, which automatically calculates the grade, Grade Point Value (GPV), and the student's overall Grade Point Average (GPA).

Tech Stack
Backend: Spring Boot, Spring Data JPA, Hibernate

Frontend: React.js, React Router

Database: H2 In-Memory Database

Prerequisites
Before you begin, ensure you have the following installed on your system:

Java Development Kit (JDK) v17 or higher.

Node.js v16 or higher (which includes npm).

An IDE like Visual Studio Code is recommended.

How to Run Locally
This project consists of two separate parts: the backend server and the frontend application. You must run both at the same time for the application to work.

1. Run the Backend Server (Port 8080)
First, start the Spring Boot backend.

Open the coursemanagement folder in your IDE (e.g., VS Code).

Locate the main application file at src/main/java/com/university/coursemanagement/CoursemanagementApplication.java.

Run this Java file.

Wait for the console to show the message Tomcat started on port(s): 8080.

Leave this server running in its terminal.

2. Run the Frontend Application (Port 3000+)
Next, start the React frontend in a new terminal window.

Navigate to the frontend project directory in your terminal:

cd course-management-ui

Install all the necessary packages:

npm install

Start the development server:

npm start

Your default web browser should automatically open a new tab to http://localhost:3000. If that port is busy, it will offer to start on another port (like 3001).

The application is now fully running.

(Note: npm run build is used to create a production-ready version of the app, but for local development and testing, npm start is the correct command. All ports are allowed.)
