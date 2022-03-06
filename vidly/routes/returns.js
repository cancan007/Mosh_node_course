
const moment = require('moment');
const Joi = require('joi');
const { Rental } = require('../models/rental');
const auth = require('../middleware/auth');
const validateMid = require('../middleware/validate');
const express = require('express');
const { Movie } = require('../models/movie');
const router = express.Router();

router.post('/', [auth, validateMid(validateReturn)], async (req, res) => {
    //if (!req.body.customerId) return res.status(400).send('customerId is not provided');
    //if (!req.body.movieId) return res.status(400).send('movieId is not provided');

    // Static: this is available directly on a class, like 'Rental.lookup()'
    // Instance: this is available on instance of class, like 'new User().generateAuthhToken()'
    const rental = await Rental.lookup(req.body.customerId, req.body.movieId);

    if (!rental) return res.status(404).send('Rental not found.');
    if (rental.dateReturned) return res.status(400).send('Return already processed.');

    rental.return();
    await rental.save();

    await Movie.updateOne({ _id: rental.movie._id }, {
        $inc: { numberInStock: 1 }
    })


    return res.send(rental);
});

function validateReturn(req) {
    const schema = Joi.object({
        customerId: Joi.objectId().required(),
        movieId: Joi.objectId().required()
    });
    return schema.validate(req);
};

module.exports = router;