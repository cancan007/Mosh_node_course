
const config = require('config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const _ = require('lodash'); // to pick up some parameters in model
const Joi = require('joi');
const express = require('express');
const mongoose = require('mongoose');
const { User } = require('../models/user');
const validateMid = require('../middleware/validate');
const router = express.Router();



router.post('/', validateMid(validate), async (req, res) => {
    //const { error } = validate(req.body);
    //if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send(`Invalid Email or Password.`);

    const validPassword = await bcrypt.compare(req.body.password, user.password);  // get the salt and rehash with it and password to compare the result
    if (!validPassword) return res.status(400).send('Invalid Email or Password.');

    const token = user.generateAuthToken(); // Information Expert Principle


    res.send(token);
});



function validate(req) {
    const schema = Joi.object({
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(1024).required()
    });
    return schema.validate(req);
};

module.exports = router;