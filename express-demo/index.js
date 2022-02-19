
const config = require("config");
const morgan = require('morgan');
const helmet = require('helmet');
const Joi = require('joi'); // to easily validate
const logger = require('./logger');
const express = require("express"); // to easily create server
const app = express();

console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
console.log(`app: ${app.get('env')}`); // show which environments you works on. app.get('env') === NODE_ENV
app.use(express.json()); // export.json: parse req.body, if there is a json object, it populate req.body.
app.use(express.urlencoded({ extended: true })); // key=value&key=value  export.urlencoded: it populate req.body from urlencoded value
app.use(express.static('public')); // You can put static file like css in public folder.
app.use(helmet()); // to make your server secure with complicated HTTP headers

console.log("Application Name: " + config.get("name"));
console.log("Mail Server: " + config.get("mail.host"));
console.log("Mail Password: " + config.get("mail.password"));  // automatically, get env vironments from config folder.
if (app.get('env') === 'development') {
    app.use(morgan('tiny')); // every time you send a request, it show a log
    console.log('Morgan enabled ...');
}

app.use(logger); // logger is a custom middleware you created
//app.use(function (req, res, next) {
//console.log('Logging...');
//next(); // if next func is not existing, req res cycle end up hanging(never stop)
//});
app.use(function (req, res, next) {
    console.log("Authenticating...");
    next();
});

const courses = [
    { id: 1, name: 'course1' },
    { id: 2, name: 'course2' },
    { id: 3, name: 'course3' }
];

app.get('/', (req, res) => {
    res.send("Hello World!!!");
});

app.get('/api/courses', (req, res) => {
    res.send(courses);
});

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) res.status(404).send('The course with given ID was not found.');
    res.send(course);
});

//POST: create a new thing
app.post('/api/courses', (req, res) => {
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

app.get('/api/posts/:year/:month', (req, res) => {
    res.send(req.query);
});

// PUT: to update
app.put('/api/courses/:id', (req, res) => {
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
app.delete('/api/courses/:id', (req, res) => {
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

//PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

