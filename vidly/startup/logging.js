const winston = require('winston');
//require('winston-mongodb');
require('express-async-errors'); // this return async error message, and what you have to do is just wtiting this

module.exports = function () {
    // this is to caught error outside express
    /*
    process.on('uncaughtException', (ex) => {
        console.log('WE GOT AN UNCAUGHT EXCEPTION');
        winston.error(ex.message, ex);
        process.exit(1); // 0: success, anything but 0: failed
    }); */

    winston.handleExceptions(new winston.transports.Console({ colorize: true, prettyPrint: true }), new winston.transports.File({ filename: 'uncaughtExceptions.log' })); // this catch only uncaughtExceptions

    // this is to caught error outside express
    process.on('unhandledRejection', (ex) => {
        console.log('WE GOT AN UNHANDLED REJECTION');
        winston.error(ex.message, ex);
        process.exit(1);
    });

    //winston.add(winston.transports.File, { filename: 'logfile.log' });  // write  log message on a file
    winston.add(new winston.transports.File({ filename: 'logfile.log' }));
    //winston.add(new winston.transports.MongoDB({ db: 'mongodb://localhost/vidly' }));
}