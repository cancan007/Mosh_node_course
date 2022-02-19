function log(req, res, next) {  // custom middleware function
    console.log("Logging...");
    next();
};
module.exports = log;