const config = require('config');
const { User, validate } = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); // Require jsonwebtoken
const express = require('express');
const router = express.Router();

// Authentication Endpoint
router.post('/', async (req, res) => {
    const { error } = validate.auth(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    try {
        // Find the user by email
        const user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(400).send('Invalid email or password.');

        // Compare the provided password with the hashed password
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) return res.status(400).send('Invalid email or password.');

        // Upon successful authentication, create a token
        const token = jwt.sign(
            { name: user.name, email: user.email }, // You can include any user-specific information here
            config.get('jwtPrivateKey'), // The secret key for signing the token
            { expiresIn: '2h' } // Optional: configure the token to expire in 2 hours
        );
        res.header('x-auth-token', token);
        // Send the token to the user
        res.send('Succeded \n'); // You could also include additional user information if needed
    } catch (error) {
        console.error(error);
        res.status(500).send('Something went wrong during authentication.');
    }
});

module.exports = router;
