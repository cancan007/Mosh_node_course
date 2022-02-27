const bcrypt = require('bcrypt');
const _ = require('lodash'); // to pick up some parameters in model
const Joi = require('joi');
const express = require('express');
const mongoose = require('mongoose');
const { User, validate } = require('../models/user');
const router = express.Router();



router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send(`User already registered. : ${user}`);

    user = new User(
        _.pick(req.body, ['name', 'email', 'password'])
    )
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    user = await user.save();
    res.send(_.pick(user, ['_id', 'name', 'email']));
});

module.exports = router;