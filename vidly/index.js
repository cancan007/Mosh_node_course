const winston = require('winston');
const express = require('express');
const app = express();

const helmet = require('helmet');  // to protect this app from some attacks
const compression = require('compression');

require('./startup/routes')(app);
require('./startup/db')();
require('./startup/logging')();
require('./startup/config')();
require('./startup/validation')();
//require('./startup/prod')(app);
app.use(helmet());
app.use(compression());


//throw new Error('Something faied during startup');
//const p = Promise.reject(new Error('Something failed miserably!'));
//p.then(() => console.log('Done')); // unhandled process rejection

const port = process.env.PORT || 3000;
const server = app.listen(port, () => console.log(`Listening on port ${port}...`));

module.exports = server;

