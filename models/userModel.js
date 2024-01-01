// Importing the Mongoose library for MongoDB interactions
const mongoose = require('mongoose');

// User Schema Definition
const userSchema = new mongoose.Schema({
    // User's name
    name: {
        type: String,
        required: true, // Name is a required field
        unique: true, // Name must be unique
        trim: true, // Remove leading and trailing whitespaces
    },

    // User's contact information
    contact: {
        type: String,
        required: true, // Contact is a required field
        unique: true, // Contact must be unique
    },

    // User's email address
    email: {
        type: String,
        required: true, // Email is a required field
        unique: true, // Email must be unique
        trim: true, // Remove leading and trailing whitespaces
    },

    // User's password
    password: {
        type: String,
        required: true, // Password is a required field
    },

    // User's type, either 'admin' or 'user'
    userType: {
        type: String,
        enum: ['admin', 'user'], // User type must be one of the specified values
        default: 'user', // Default user type is 'user'
    },

    // User's profile image details
    profileImage: {
        fileName: String, // File name of the profile image
        fileUrl: String, // File URL of the profile image
    },
});

// User Model
const User = mongoose.model('User', userSchema, 'userDB');

// Exporting the User model for use in other parts of the application
module.exports = User;
