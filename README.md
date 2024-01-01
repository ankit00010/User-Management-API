# User Management API

This API provides functionality for user management, authentication, and admin operations.

## Install Dependencies

To install the necessary dependencies, open your terminal and run the following command:

    ```bash
    npm install


2. Set up a `.env` file in the root directory with the following content:
   ```env
   PORT=5001
   CONNECTION_STRING=<your_mongodb_connection_string>
   ACCESS_TOKEN_SECRET_KEY=<your_jwt_secret_key>


## Start the Server

To start the server, run the following command:

```bash
npm run dev


## Routes

### Authentication

#### User Registration

- **POST /api/auth/register**
  - Body: JSON (multipart form with profile image)
  - Required Fields: name, contact, email, password, profileImage
  - Register a new user.

#### Admin Registration

- **POST /api/auth/register/admin**
  - Body: JSON (multipart form with profile image)
  - Required Fields: name, contact, email, password, profileImage
  - Register a new admin.


## User/Admin Login

- **POST /api/auth/login**
  - Body: JSON
  - Required Fields: email or contact, password
  - Login as a user.

## User Operations

### Get User by ID

- **GET /api/users/:id**
  - Required Params: id
  - Retrieve user details.

### Update User by ID

- **PUT /api/users/:id**
  - Body: JSON (multipart form with profile image)
  - Required Params: id
  - Update user details.

### Delete User by ID

- **DELETE /api/users/:id**
  - Required Params: id
  - Delete user.

## Admin Operations

### Get All Users

- **GET /api/admin**
  - Retrieve a list of all users.

### Get User by ID (Admin)

- **GET /api/admin/:id**
  - Required Params: id
  - Retrieve user details.

### Update User by ID (Admin)

- **PUT /api/admin/:id**
  - Body: JSON (multipart form with profile image)
  - Required Params: id
  - Update user details.

### Delete User by ID (Admin)

- **DELETE /api/admin/:id**
  - Required Params: id
  - Delete user.
# Roles and Access Control

Two roles are defined: Admin and User.

- Admins can view, modify, and delete all user details.
- Users can only view, modify, and delete their own details.

# Authentication and Security

JWT is used for authentication.

Passwords are securely encrypted using bcrypt.

# Image Storage

Profile images are saved locally in the 'uploads' directory.

# Database and Framework

Express.js is used for API development.

MongoDB is used as the database.

# Data Validation

Thorough data validation is implemented to ensure correctness and integrity.

# Author

Ankit Mishra
