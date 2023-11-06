const jwt = require('jsonwebtoken');
const config = require('config');

// Middleware to authenticate and attach user to the request if a valid JWT is provided
const authMiddleware = (req, res, next) => {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).send('Access denied. Please log in again\n');

    try {
        const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
        req.user = decoded; // Add the decoded user to the request object
        next(); // Pass control to the next handler
    } catch (ex) {
        res.status(400).send('Invalid token.\n');
    }
};


module.exports = authMiddleware;
