const { Movie, validate } = require('../models/movie');
const { Genre } = require('../models/genre');
const validateMid = require('../middleware/validate');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    const movies = await Movie.find().sort('name');
    res.send(movies);
});

router.post('/', validateMid(validate), async (req, res) => {

    //const { error } = validate(req.body);
    //if (error) return res.status(400).send(error.detail[0].message);

    const genre = await Genre.findById(req.body.genreId);
    if (!genre) return res.status(400).send('Invalid genre.');

    let movie = new Movie({
        title: req.body.title,
        genre: {
            _id: genre._id,
            name: genre.name
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    });

    movie = await movie.save();

    res.send(movie);
})

module.exports = router;