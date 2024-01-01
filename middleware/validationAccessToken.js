// Importing the JSON Web Token (JWT) library for token validation
const jwt = require("jsonwebtoken");

// Middleware function for validating access tokens
const validateToken = async (req, res, next) => {
    // Initializing token variable
    let token;

    // Extracting token from the authorization header
    let authHeader = req.headers.authorization || req.headers.Authorization;
    if (authHeader && authHeader.startsWith("Bearer")) {
        const tokenArray = authHeader.split(" ");
        token = tokenArray.length >= 2 ? tokenArray[1] : null;

        // Checking if the token exists
        if (!token) {
            res.status(401).json({ message: "Not authorized" });
        } else {
            // Verifying the token using the secret key
            jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY, (err, decoded) => {
                if (err) {
                    return res.status(401).json({ message: "User is not authorized" });
                }

                // Logging decoded user information and attaching it to the request object
                console.log(decoded.user);
                req.user = decoded.user;
                // Proceeding to the next middleware or route handler
                next();
            });
        }
    } else {
        // Handling the case when the authorization header is not present or not formatted correctly
        res.status(401).json({ message: "Not authorized" });
    }
};

// Exporting the validateToken middleware for use in other parts of the application
module.exports = validateToken;
