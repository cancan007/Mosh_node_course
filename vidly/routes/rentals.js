const { Rental, validate, removeRental } = require('../models/rental');
const { Movie } = require('../models/movie');
const { Customer } = require('../models/customer');
const mongoose = require('mongoose');
const validateMid = require('../middleware/validate');
//const Fawn = require('fawn');  // make mongooseDB more secure when operate. to protect data
const express = require('express');
const router = express.Router();

//Fawn.init(mongoose);

router.get('/', async (req, res) => {
    const rentals = await Rental.find().sort('-dateOut');
    res.send(rentals);
});

router.post('/', validateMid(validate), async (req, res) => {
    //const { error } = validate(req.body);
    //if (error) return res.status(400).send(error.details[0].message);

    if (!mongoose.Types.ObjectId.isValid(req.body.customerId)) {
        return res.status(400).send('Invalid Customer.');
    }
    const customer = await Customer.findById(req.body.customerId);
    if (!customer) return res.status(400).send('Invalid Cutomer.');

    if (!mongoose.Types.ObjectId.isValid(req.body.movieId)) {
        return res.status(400).send('Invalid Movie.');
    }
    const movie = await Movie.findById(req.body.movieId);
    if (!movie) return res.status(400).send('Invalid Movie.');
    if (movie.numberInStock === 0) return res.status(400).send('Movie not in stock.');

    let rental = new Rental({
        customer: {
            _id: customer._id,
            name: customer.name,
            phone: customer.phone,
        },
        movie: {
            _id: movie._id,
            title: movie.title,
            dailyRentalRate: movie.dailyRentalRate
        },
        rentalFee: req.body.rentalFee
    });

    rental = await rental.save((error) => {
        if (error) return res.status(400).send('Rental valication failed.');
    });
    movie.numberInStock--;
    await movie.save((error) => {
        if (error) {
            removeRental(rental._id);
            return res.status(400).send('Movie validation failed, Rental canceled.');
        }
        res.send(rental);
    });
    /*
        try {
            new Fawn.Task()
                .save('rentals', rental)
                .update('movies', { _id: movie._id }, { $inc: { numberInStock: -1 } })
                .run();
    
            res.send(rental);
        }
        catch (error) {
            res.status(500).send('Something failed.'); // 500: internal server error
        }*/


})

module.exports = router;