const User = require('../models/userModel');
const fs = require('fs');

// Controller functions for handling user-related operations

// Function to get a user by ID
const getUser = async (req, res) => {
    const userID = req.params.id;

    // Validate user ID
    if (!userID) {
        return res.status(400).json({ message: "Invalid user ID" });
    }

    try {
        // Find user by ID
        const user = await User.findById(userID);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Send the user details as a JSON response
        return res.status(200).json(user);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

// Function to update a user by ID
const updateUser = async (req, res) => {
    const userID = req.params.id;
    const { name } = req.body;
    const profileImage = req.file;

    // Validate user ID
    if (!userID) {
        return res.status(400).json({ message: "Invalid user ID" });
    }

    try {
        // Find user by ID
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

                // Update the user's profile image
                user.profileImage = { fileName: profileImage.filename };
            } else {
                // If no previous image, update the user's profile image
                user.profileImage = { fileName: profileImage.filename };
            }
        }

        // Update other user properties based on req.body
        user.name = name;

        // Save the updated user
        await user.save();

        // Send the updated user details as a JSON response
        return res.status(200).json(user);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

// Function to delete a user by ID
const deleteUser = async (req, res) => {
    const userID = req.params.id;

    // Find user by ID
    const user = await User.findById(userID);

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    // Check if the user making the request is the same as the user being deleted
    if (user._id.toString() !== req.user.id) {
        res.status(403).json({ message: "User doesn't have permission to delete other users" });
        console.log('Users id ' + req.user.id);
    }

    // Attempt to remove the user
    const result = await User.deleteOne({ _id: userID });

    // Send a success message as a JSON response
    return res.status(200).json({ message: "User deleted successfully", deletedUser: result });
};

// Exporting the userController functions for use in the application
module.exports = {
    getUser,
    updateUser,
    deleteUser
};
