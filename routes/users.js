const { User, validate } = require('../models/user');
const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();
const saltRounds = 10;


router.post('/', async (req, res) => {
    const { error } = validate.user(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    try {
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) return res.status(400).send('User already registered.');

        const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
        // Using .create() to create and save the user document
        const user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
        });

        const result = {
            name: user.name,
            email: user.email,
        };

        res.send(result);
    } catch (error) {
        console.error(error);
        res.status(500).send('Something failed while creating a user.');
    }
});

module.exports = router;