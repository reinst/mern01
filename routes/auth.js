const { User } = require('../models/user');
const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();

// Authentication Endpoint
router.post('/', async (req, res) => {
    try {
        // Find the user by email
        const user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(400).send('Invalid email or password.');

        // Compare the provided password with the hashed password
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) return res.status(400).send('Invalid email or password.');

        // Upon successful authentication, you would typically create a token
        // Here we just send a success message or user details as an example
        const result = "Your are now logged in.";
        res.send(result);
    } catch (error) {
        console.error(error);
        res.status(500).send('Something went wrong during authentication.');
    }
});

module.exports = router;
