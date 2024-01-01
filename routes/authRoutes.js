// Importing necessary modules and controllers for authentication
const express = require('express');
const { userLogin, userRegister, adminRegister } = require("../controllers/authController");
const upload = require("../middleware/upload");

// Creating a router instance for handling authentication routes
const router = express.Router();

// Endpoint for user registration with optional profile image upload
router.post('/register', upload.single('profileImage'), userRegister);

// Endpoint for admin registration with optional profile image uploads
router.post('/register/admin', upload.single('profileImage'), adminRegister);

// Endpoint for user login
router.post('/login', userLogin);

// Exporting the router for use in the application
module.exports = router;
