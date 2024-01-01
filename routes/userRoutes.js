// Importing the Express framework
const express = require("express");

// Importing controllers for handling user-related logic
const { getUser, updateUser, deleteUser } = require("../controllers/userController");

// Importing middleware for handling file uploads
const upload = require("../middleware/upload");

// Importing middleware for validating access tokens
const validAccessToken = require("../middleware/validationAccessToken");

// Creating a router instance for handling user-related routes
const router = express.Router();

// Applying access token validation middleware for all user routes
router.use(validAccessToken);

// Restful routes for user operations
router.route("/:id")
    .get(getUser) // Endpoint to retrieve user details
    .put(upload.single('profileImage'), updateUser) // Endpoint to update user details with optional profile image upload
    .delete(deleteUser); // Endpoint to delete user

// Exporting the router for use in the application
module.exports = router;
