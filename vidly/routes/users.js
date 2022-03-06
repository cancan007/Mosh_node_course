const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcrypt');
const _ = require('lodash'); // to pick up some parameters in model
const Joi = require('joi');
const express = require('express');
const mongoose = require('mongoose');
const { User, validate } = require('../models/user');
const validateMid = require('../middleware/validate');
const auth = require('../middleware/auth');
const router = express.Router();

// this auth is not authentication, it is autholization
router.get('/me', auth, async (req, res) => {
    const user = await User.findById(req.user._id).select('-password'); // auth middleware gives req.user
    if (!user) return res.status(400).send(`Your Id is not found. ID: ${req.user._id}`);
    res.send(user);

});

router.post('/', validateMid(validate), async (req, res) => {
    //const { error } = validate(req.body);
    //if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send(`User already registered. : ${user}`);

    user = new User(
        _.pick(req.body, ['name', 'email', 'password'])
    )
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    user = await user.save();

    const token = user.generateAuthToken();
    res.header('x-auth-token', token).send(_.pick(user, ['_id', 'name', 'email'])); // you should add prefix like '"x"-auth-token'
});

module.exports = router;