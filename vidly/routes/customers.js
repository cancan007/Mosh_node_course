const Joi = require('joi');
const express = require('express');
const mongoose = require('mongoose');
const { Customer, validate } = require('../models/customer');
const validateMid = require('../middleware/validate');
const router = express.Router();



router.get('/', async (req, res) => {
    const customers = await Customer.find().sort('name');
    res.send(customers);
});

router.post('/', validateMid(validate), async (req, res) => {
    //const { error } = validate(req.body);
    //if (error) return res.status(400).send(error.details[0].message);

    let customer = new Customer({
        name: req.body.name,
        phone: req.body.phone,
        isGold: req.body.isGold
    })
    customer = await customer.save();
    res.send(customer);
});



module.exports = router;