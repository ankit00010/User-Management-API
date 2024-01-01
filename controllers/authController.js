// Importing the Express framework and necessary modules
const express = require('express');
const User = require('../models/userModel');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Function to handle user registration
const registerUser = async (req, res, userType) => {
    try {
        // Extract data from the request body
        const { name, contact, email, password } = req.body;
        const profileImage = req.file;

        // Check if all required fields are provided
        if (!name || !contact || !email || !password || !profileImage) {
            return res.status(400).json({ message: "Please provide all the fields" });
        }

        // Email format validation
        const emailCheck = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailCheck.test(email)) {
            return res.status(400).json({ message: "Please provide a valid email address" });
        }

        // Hash the user's password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Construct the fileUrl using the server's base URL and relative path
        const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${profileImage.filename}`;

        // Create a new user instance
        const newUser = new User({
            name,
            contact,
            email,
            password: hashedPassword,
            userType,
            profileImage: {
                fileName: profileImage.filename,
                fileUrl: fileUrl,
            },
        });

        // Save the user to the database
        await newUser.save();

        // Send a success message as a JSON response
        res.status(201).json({ message: `${userType} registered successfully` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Function to handle user registration, with user role
const userRegister = async (req, res) => {
    await registerUser(req, res, 'user');
};

// Function to handle admin registration, with admin role
const adminRegister = async (req, res) => {
    await registerUser(req, res, 'admin');
};

// Function to handle user login
const userLogin = async (req, res) => {
    try {
        const { email, contact, password } = req.body;

        // Either email or contact is provided, and password is mandatory
        if ((!contact && !email) || !password) {
            return res.status(400).json({ message: "Please provide either email or contact, and password is mandatory" });
        }

        let user;

        // Find the user based on either email or contact
        if (email) {
            user = await User.findOne({ email });
        } else {
            user = await User.findOne({ contact });
        }

        // Check if the user exists and validate the password with hashed password in the database
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Generate an access token
        const accessToken = jwt.sign(
            {
                user: {
                    name: user.name,
                    email: user.email,
                    role: user.userType,
                    id: user._id,
                },
            },
            process.env.ACCESS_TOKEN_SECRET_KEY,
            { expiresIn: "10m" }
        );

        // Send a success message with the access token as a JSON response
        res.status(200).json({ message: "Login successful", token: accessToken });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Exporting the authController functions for use in the application
module.exports = {
    userRegister,
    userLogin,
    adminRegister
};
