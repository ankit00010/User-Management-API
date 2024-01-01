// Importing the User model and the File System (fs) module
const User = require('../models/userModel');
const fs = require('fs');

// Controller functions for handling admin-related operations
const getAllUsers = async (req, res) => {
    // Check if the user making the request has admin role
    if (req.user.role !== "admin") {
        return res.status(403).json({ message: "Access forbidden. Admin role required." });
    }
    try {
        // Retrieve all user documents with 'user' userType
        const users = await User.find({ userType: 'user' });

        // Send the list of users as a JSON response
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const getUserById = async (req, res) => {
    const userId = req.params.id;
    // Check if the user making the request has admin role
    if (req.user.role !== "admin") {
        return res.status(403).json({ message: "Access forbidden. Admin role required." });
    }
    try {
        // Find a user document by its ID
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // Send the user details as a JSON response
        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const updateUserById = async (req, res) => {
    const userID = req.params.id;
    const { name, email, contact, password, userType } = req.body;
    const profileImage = req.file;

    if (!userID) {
        return res.status(400).json({ message: "Invalid user ID" });
    }

    try {
        // Find a user document by its ID
        const user = await User.findById(userID);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Check if a file was uploaded
        if (profileImage) {
            // Delete the previous profile image if it exists
            if (user.profileImage.fileName) {
                // Perform the deletion operation asynchronously
                const filePath = `./uploads/${user.profileImage.fileName}`;
                fs.unlink(filePath, (unlinkError) => {
                    if (unlinkError) {
                        console.error(unlinkError);
                    }
                });

                // Update the user's profile image with the new fileUrl
                user.profileImage = {
                    fileName: profileImage.filename,
                    fileUrl: `http://localhost:5000/uploads/${profileImage.filename}`,
                };
            } else {
                // If no previous image, update the user's profile image with the new fileUrl
                user.profileImage = {
                    fileName: profileImage.filename,
                    fileUrl: `http://localhost:5000/uploads/${profileImage.filename}`,
                };
            }
        }

        // Update other user properties based on req.body
        if (name) user.name = name;
        if (email) user.email = email;
        if (contact) user.contact = contact;
        if (password) user.password = password;
        if (userType) user.userType = userType;

        // Save the updated user
        await user.save();

        // Send the updated user details as a JSON response
        return res.status(200).json(user);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

const deleteUserById = async (req, res) => {
    // Check if the user making the request has admin role
    if (req.user.role !== "admin") {
        return res.status(403).json({ message: "Access forbidden. Admin role required." });
    }
    const userId = req.params.id;
    try {
        // Find a user document by its ID and delete it
        const user = await User.findByIdAndDelete(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // Send a success message as a JSON response
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Exporting the adminController functions for use in the application
module.exports = {
    getAllUsers,
    getUserById,
    updateUserById,
    deleteUserById,
};
