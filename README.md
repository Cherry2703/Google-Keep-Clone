### Google Keep Clone - Full-Stack Application
Overview
The Google Keep Clone project is a full-stack web application that replicates the core functionality of Google Keep, allowing users to manage notes efficiently. Built with React.js for the frontend and Node.js with Express.js for the backend, the app integrates user authentication, CRUD operations for notes, and data management with a SQLite database.

### Live Demo
Frontend: Live Demo
Backend: Google Keep Backend


### Features

### Frontend Features
User Authentication: Secure login and sign-up functionality with JWT tokens.
Notes Management:
Create, update, and delete notes.
Archive and restore notes from the archive.
Responsive Design: Optimized for various devices including desktop, tablet, and mobile screens.
User Interface: Modern and clean design with a user-friendly layout.


### Backend Features
User Authentication: Handles user registration, login, and JWT token verification for secure access.
Notes CRUD Operations: API endpoints for creating, reading, updating, and deleting notes.
Database: Uses SQLite for storing user data and notes.
Middleware: Ensures secure access to the API with JWT authentication.
Data Handling: Endpoint functionality to archive, unarchive, and manage the trash.


### Technologies Used
### Frontend
React.js: For building the user interface and managing components.
CSS: For custom styling and creating a modern UI.
Axios: For making HTTP requests to the backend.
React Hooks: Used for state management and side effects.
JWT: For secure user authentication.


### Backend
Node.js & Express.js: For building and managing the server-side logic.
SQLite: For the database and data storage.
JWT: Secure authentication.
bcrypt: For password hashing and ensuring secure user registration.
UUID: For generating unique IDs for notes.
Installation Guide
Prerequisites
Ensure that the following are installed on your local system:

Node.js (v14 or higher)
npm or Yarn

### Setup Steps
1. Clone the Repository
git clone https://github.com/Cherry2703/Google-Keep-Clone.git
2. Navigate to the Project Directory
cd Google-Keep-Clone
Backend Setup
Navigate to the backend folder:
cd backend
Install backend dependencies:

npm install
Start the backend server:

npm start
The backend server should now be running at http://localhost:5000.

Frontend Setup
Navigate back to the frontend folder:

cd frontend
Install frontend dependencies:


npm install
Start the frontend server:


npm start
The frontend should now be running at http://localhost:3000.

### Project Structure

# Backend Structure
server.js: Main entry point for the backend server.
routes/: Contains the API route handlers.
controllers/: Handles logic for various API routes.
models/: Defines database models and schema.
middleware/: Includes authentication and other middlewares.


### Frontend Structure
src/components/: React components (e.g., Navbar, Sidebar, Notes).
src/hooks/: Custom hooks for state management and API calls.
src/styles/: CSS files for application styling.
App.js: Main entry point for the React app.


## How to Use
Run the backend server and ensure the API is working properly.
Run the frontend server and interact with the application.
Register an account and log in to start managing your notes.
Use the app to create, edit, delete, archive, and restore notes.
