// Admin Routes: Designed for administrators to manage user data.
// Access is protected by validating the access token provided in the request header.

const express = require('express');
const router = express.Router();
const upload = require("../middleware/upload");

const { getAllUsers, getUserById, updateUserById, deleteUserById } = require('../controllers/adminController');
const validAccessToken = require('../middleware/validationAccessToken');

// Applying  the acces token validation middleware for all admin routes
router.use(validAccessToken);

// Admin routes
router.get('/', getAllUsers); // Retrieve a list of all users.
router.route('/:id').get(getUserById).put(upload.single('profileImage'), updateUserById); // Update user details with optional profile image upload.
router.delete('/:id', deleteUserById); // Delete user.

module.exports = router;
