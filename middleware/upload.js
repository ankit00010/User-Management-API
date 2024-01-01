// Importing the Multer library for handling file uploads
const multer = require("multer");

// Configuring storage options for Multer
const storage = multer.diskStorage({
    // Destination directory where uploaded files will be stored
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },

    // Filename configuration for uploaded files
    filename: function (req, file, cb) {
        // Generating a unique filename by combining the current timestamp and the original filename
        cb(null, Date.now() + '-' + file.originalname);
    },
});

// Creating a Multer instance with the configured storage options
const upload = multer({ storage });

// Exporting the configured Multer instance for use in other parts of the application
module.exports = upload;
