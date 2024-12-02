### Google Keep Clone - Backend API


# Overview
This project is the backend API for a Google Keep-like application built using Node.js, Express.js, and SQLite. It supports user authentication, note management, and CRUD operations for notes, including features such as archiving and trash recovery.

### Features
# User Authentication
# Sign-up: Allows new users to register with a username, email, and password.
# Login: Authenticates users and returns a JWT token for secure access to the app.
# Notes Management
# Add, Edit, Delete Notes: Users can create, update, or delete their notes.
# Archive/Unarchive Notes: Notes can be archived or unarchived as needed.
# Trash Management: Notes can be deleted and stored in the trash or permanently deleted.
# Retrieve Notes: Fetch all active, archived, or trashed notes based on the user's preferences.


### Security
JWT Authentication: All APIs are secured using JWT tokens.
Password Hashing: User passwords are hashed using bcrypt for enhanced security.
### Technologies Used
Node.js & Express.js: Backend framework for building the API.
SQLite: Database used for storing user and notes data.
JWT: JSON Web Token for authentication.
bcrypt: Library for password hashing.
UUID: Used to generate unique identifiers.
CORS: Middleware for enabling Cross-Origin Resource Sharing.

### Installation and Setup
Prerequisites
Node.js: Ensure Node.js is installed. Download it here.
SQLite: Database management tool (optional for manual inspection).


# Steps to Run the Application
Clone the Repository


git clone https://github.com/Cherry2703/google-keep-backend-server.git
Navigate to the Project Directory

cd google-keep-backend-server
Install Dependencies

npm install
Set Up Environment Variables

Create a .env file in the root of the project.
Add the following line to the file:

JWT_SECRET=your_jwt_secret_key
Start the Server

npm start
The server will be running at http://localhost:3009.

### API Endpoints

## User Authentication

# POST /sign-up/
Description: Register a new user.
Request Body:

{
  "username": "newuser",
  "email": "user@example.com",
  "password": "password123"
}
Response:

{
  "message": "User Created Successfully..."
}


POST /login/
Description: Log in an existing user.
Request Body:

{
  "username": "existinguser",
  "password": "password123"
}
Response:

{
  "jwtToken": "your_jwt_token"
}

# Notes Management
GET /notes/
Description: Get all active notes for the logged-in user.
Headers:

{
  "Authorization": "Bearer your_jwt_token"
}
Response: Array of notes in JSON format.
# POST /notes/
Description: Add a new note.
Request Body:

{
  "title": "Note Title",
  "content": "Note content",
  "color": "#ffffff"
}
Response:

{
  "message": "Note Added Successfully"
}
# PUT /notes/
Description: Update an existing note.
Request Body:

{
  "noteId": "note_id",
  "title": "Updated Title",
  "content": "Updated content",
  "color": "#ff0000",
  "is_pinned": true,
  "is_archived": false,
  "is_deleted": false
}
Response:

{
  "message": "Note updated Successfully"
}
# DELETE /trash/
Description: Permanently delete or recover a note from the trash.
Request Body:

{
  "noteId": "note_id",
  "recoverNote": "optional_note_id_for_recovery"
}
Response:

{
  "message": "Note Deleted/Recovered Successfully"
}
Error Handling
Standard error responses include 500 Internal Server Error for unexpected issues and 400 Bad Request for invalid input.
GitHub Repository
For full project details, check out the GitHub repository.