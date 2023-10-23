const { User, validate } = require('../models/user');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) return res.status(400).send('User already registered.');
    
        user = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        });
        await user.save();
        res.send(user);    
    } catch (error) {
        console.error(error);
        res.status(500).send('Something failed while creating a user.')
    }

});


module.exports = router;