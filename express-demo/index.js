const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');
const config = require("config");
const morgan = require('morgan');
const helmet = require('helmet');
const Joi = require('joi'); // to easily validate
const logger = require('./middleware/logger');
const home = require('./routes/home');
const courses = require('./routes/courses');
const express = require("express"); // to easily create server
const app = express();

app.set('view engine', 'pug');
app.set('views', './views'); // default

console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
console.log(`app: ${app.get('env')}`); // show which environments you works on. app.get('env') === NODE_ENV
app.use(express.json()); // export.json: parse req.body, if there is a json object, it populate req.body.
app.use(express.urlencoded({ extended: true })); // key=value&key=value  export.urlencoded: it populate req.body from urlencoded value
app.use(express.static('public')); // You can put static file like css in public folder.
app.use(helmet()); // to make your server secure with complicated HTTP headers
app.use('/api/courses', courses);

console.log("Application Name: " + config.get("name"));
console.log("Mail Server: " + config.get("mail.host"));
console.log("Mail Password: " + config.get("mail.password"));  // automatically, get env vironments from config folder.
if (app.get('env') === 'development') {
    app.use(morgan('tiny')); // every time you send a request, it show a log
    //console.log('Morgan enabled ...');
    startupDebugger('Morgan enabled...');
}

// db debugger
dbDebugger('Connected to the database...');

app.use(logger); // logger is a custom middleware you created
//app.use(function (req, res, next) {
//console.log('Logging...');
//next(); // if next func is not existing, req res cycle end up hanging(never stop)
//});
app.use(function (req, res, next) {
    console.log("Authenticating...");
    next();
});

app.use('/', home);

//PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

