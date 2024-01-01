const express = require('express');
const serveStatic = require('serve-static');
const path = require('path');
const connectDB = require('./config/dbConnection');
const dotenv = require('dotenv').config();

// Establish a connection to the database
connectDB(); // Database connection

// Create an instance of the Express application
const app = express();

// Set the port to 5000 or use the environment variable PORT
const port = process.env.PORT || 5001;

// Enable JSON parsing for incoming requests
app.use(express.json());

// Serve static files from the 'uploads' directory
app.use('/uploads', serveStatic(path.join(__dirname, 'uploads')));

// Define routes for different parts of the application
app.use('/api/admin', require('./routes/adminRoutes')); // Admin access logic
app.use('/api/users', require('./routes/userRoutes')); // Users access logic
app.use('/api/auth', require('./routes/authRoutes')); // Users logic

// Start the server and listen on the specified port
app.listen(port, () => {
    console.log(`The server is running on port ${port}`);
});
