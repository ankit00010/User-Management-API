const mongoose = require('mongoose');

// Function to connect to the MongoDB database
const connectDB = async () => {
    try {
        // Attempt to connect to the MongoDB database using the provided connection string
        const connect = await mongoose.connect(process.env.CONNECTION_STRING);

        // Log a message indicating a successful database connection
        console.log('Database connected:', connect.connection.host, connect.connection.name);

    } catch (error) {
        // Log any errors that occur during the connection attempt
        console.log(error);

        // Terminate the process with an exit code of 1 if there is an error
        process.exit(1);
    }
};

// Export the connectDB function for use in the application
module.exports = connectDB;
