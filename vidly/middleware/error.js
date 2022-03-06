const winston = require("winston");


// catch errors in context of express
module.exports = function (err, req, res, next) {
    // Log the Exception
    winston.error(err.message, err);  // (displayed object, object written on log file(optionally))
    // Level is below
    // error
    // warn
    // info
    // verbose
    // debug
    // silly

    res.status(500).send('Something failed.');
};