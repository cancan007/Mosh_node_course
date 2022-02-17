var url = "http://mylogger.io/log";
const EventEmitter = require("events");  // You should use Upper letter if it's class.

class Logger extends EventEmitter {
    log(message) {
        // Send an HTTP requst
        console.log(message);
        // Raise an event
        this.emit("messageLogged", { id: 1, url: "http://" }); // this means Logger which override EventEmitter
    }
}


//module.exports.log = log;  // to let log func be used from other file which call module
//module.exports.endPoint = url;  // it's not have to same name
//module.exports = log; 
module.exports = Logger;