# Employee_Management

📌 Project Overview

The Employee Management System is a backend application built using Node.js, Express, and MySQL. It provides authentication, authorization, and role-based access control to manage employees efficiently.

🚀 Features & Functionalities

◻️ User Authentication & Authorization

    ◾JWT-based authentication
    ◾Role-based access control (RBAC) (Admin, HR, Employee)
    ◾Each API is protected by token verification

◻️ User Roles & Permissions

    ◾Admin: Can manage all users, view employee details, and assign roles.
    ◾HR: Can manage employee records and access reports.
    ◾Employee: Can view their profile and update limited details.

◻️ API Protection & Middleware

    ◾JWT for token verification
    ◾Authorization middleware for role-based restrictions

◻️ Security Enhancements

    ◾Password hashing with bcrypt
    ◾Environment variables for sensitive credentials
```bash
📂 Project Structure

Employee_management/
├── src/
|   ├── config/
|       ├── db.js               # Database configuration
|
├── controllers/
|   ├── authControllers.js      # Auth-related operations
|   ├── employeeController.js   # Employee-related operations
|
├── middleware/
|   ├── authMiddleware.js       # Token verification and Role based access middleware
|
├── routes/
|   ├── authRoutes.js           # Routes for authController
|   ├── employeeRoutes.js       # Routes for employeeController
|
├── app.js                      # Functional point
├── .env                        # Environment variables
├── package.json                # Dependencies
├── README.md                   # Project Documentation
└── server.js                   # Entry point
```
🛠️ Installation & Setup

1️⃣ Clone the Repository

git clone https://github.com/Kabileshk18/Employee_Management.git

2️⃣ Install Dependencies

npm install

3️⃣ Configure Environment Variables

Create a .env file in the root directory and add:

DB_HOST = localhost
DB_USER = root
DB_PASS = yourpassword
PORT = 5000
JWT_SECRET = your_secret_key
JWT_EXPIRES_IN = 1h

4️⃣ Start the Application

npm start

For development with nodemon:

nodemon start

🔒 Authentication & Authorization

◾JWT Authentication: Users must log in to receive a token.
◾Role-Based Access Control (RBAC): Specific APIs are accessible only by allowed roles.
◾Middleware Protection: All APIs are secured with token verification and authorization.

🛠️ Technologies Used

◾Backend: Node.js, Express.js
◾Database: MySQL
◾Authentication: JWT
◾Security: Bcrypt for password hashing

👨‍💻 Author

Developed by Kabilesh K | GitHub: @Kabileshk18