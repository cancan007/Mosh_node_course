
const Joi = require('joi'); // to easily validate
const express = require('express');
const router = express.Router();

const courses = [
    { id: 1, name: 'course1' },
    { id: 2, name: 'course2' },
    { id: 3, name: 'course3' }
];

router.get('/', (req, res) => {
    res.send(courses);
});

router.get('/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) res.status(404).send('The course with given ID was not found.');
    res.send(course);
});

//POST: create a new thing
router.post('/', (req, res) => {
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
    });

    const result = schema.validate(req.body);
    console.log(result);
    if (result.error) {
        //400 Bad Request
        res.status(400).send(result.error.details[0].message);
        return;
    }

    //if (!req.body.name || req.body.name.length < 3) {
    //400 Bad Request
    //res.status(400).send('Name is required and should be minimum 3 characters.');
    //return;
    //}
    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});

//app.get('/api/posts/:year/:month', (req, res) => {
//res.send(req.query);
//});

// PUT: to update
router.put('/:id', (req, res) => {
    // Look up the course
    // If not existing, return 404
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) {
        return res.status(404).send('The course with the given ID was not found.');
    }

    // Validate
    // If invalid, return 400 - Bad request
    //const validation = validateCourse(req.body);
    const { error: valError } = validateCourse(req.body); // validation.error === valError
    if (valError) {
        res.status(400).send(valError.details[0].message);
        return;
    }

    // Update course
    // Return the updated course
    course.name = req.body.name;
    res.send(course);
});

// DELETE
router.delete('/:id', (req, res) => {
    // Look up
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) {
        return res.status(404).send("The course with the given ID was not found.");
    }

    // Delete
    const index = courses.indexOf(course);
    courses.splice(index, 1);

    res.send(course);
})

function validateCourse(course) {
    const schema = Joi.object({
        name: Joi.string().min(3)
    }).required();
    return schema.validate(course);
}

module.exports = router;