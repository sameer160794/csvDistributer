# MERN CSV Distributor

A **MERN stack** application to **upload CSV/XLSX files** and distribute their contents evenly among agents. Includes an admin panel for uploading files and viewing distributed lists.

---

## Table of Contents

- [Features](#features)  
- [Tech Stack](#tech-stack)  
- [Project Structure](#project-structure)  
- [Setup](#setup)  
  - [Backend Setup](#backend-setup)  
  - [Frontend Setup](#frontend-setup)  
- [Running the Application](#running-the-application)  
- [Usage](#usage)  
- [Notes](#notes)  
- [Scripts](#scripts)  
- [Contact](#contact)  

---

## Features

- Upload multiple CSV/XLSX files at once.  
- Automatically parse rows and distribute them evenly among agents.  
- View distributed lists per agent.  
- JWT-based authentication for admin and agents.  
- Role-based access control (admin vs agent).  

---

## Tech Stack

- **Frontend:** React, Axios  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB (Mongoose ORM)  
- **File Processing:** XLSX, CSV parsing  
- **Authentication:** JWT  

---

## Project Structure

backend/
controllers/
uploadController.js
distributedController.js
middleware/
authMiddleware.js
roleMiddleware.js
errorMiddleware.js
models/
userModel.js
distributedModel.js
routes/
authRoutes.js
agentRoutes.js
uploadRoutes.js
distributedRoutes.js
config/
db.js
server.js

frontend/
src/
api/
axiosInstance.js
components/
DistributedList.jsx
UploadFiles.jsx
App.jsx
index.js

yaml
Copy code

---

## Setup

### Backend Setup

1. **Install dependencies**:

```bash
cd backend
npm install
Environment Variables:

Create a .env file in backend/ with the following:

env
Copy code
PORT=5000
MONGO_URI=mongodb://localhost:27017/mern_csv_distributor
JWT_SECRET=your_jwt_secret_here
Start MongoDB (local):

bash
Copy code
# Linux/macOS
sudo service mongod start

# Windows (if installed via MongoDB service)
net start MongoDB
Run the backend server:

bash
Copy code
npm run dev
Backend runs on: http://localhost:5000

Frontend Setup
Install dependencies:

bash
Copy code
cd frontend
npm install
Start the frontend:

bash
Copy code
npm start
Frontend runs on: http://localhost:3000

Running the Application
Register users: Create an admin and some agent accounts via /api/auth/register (or seed the database).

Login as admin to upload files.

Upload CSV/XLSX files via the admin upload page.

Distributed lists will be saved in MongoDB. Admin can view all lists; agents can see their assigned lists (requires backend route /lists/me).

Usage Notes
File processing: Supports .csv, .xlsx, .xls. Unsupported files are skipped.

Distribution: Rows are split evenly among agents. If the number of rows isn’t divisible, some agents may have one extra row.

Security: JWT tokens are required for all protected routes. Make sure tokens are stored in localStorage or a secure frontend state.

Frontend fetching: Make sure Axios attaches Authorization header:

js
Copy code
axios.get("/lists", {
  headers: { Authorization: `Bearer ${token}` }
});
Known limitation: Agents cannot fetch lists without a backend route specifically for them (/lists/me). Admin routes are restricted to admins only.

Scripts
Backend:

bash
Copy code
npm run dev      # Runs backend with nodemon
npm start        # Runs backend normally
Frontend:

bash
Copy code
npm start        # Runs frontend in development mode
npm run build    # Builds production-ready frontend
Contact
For issues or questions, contact Your Name / your.email@example.com

