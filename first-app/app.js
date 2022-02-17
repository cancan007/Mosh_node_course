//function sayHello(name) {
//console.log(name);
//}

//sayHello("Mosh");
//setTimeout();
//clearTimeout();

//setInterval();
//clearInterval();

//window.setTimeout();  //setTimeout is same to window.setTimeout

//var message = "";
//console.log(global.message); // var value is not added to global, so you will get undifined

//var sayHello = function () { // functions are added to global scope, so you can use window.sayHello. And overwrite sayHello.
//console.log("Hello")
//}

//window.sayHello();
//var logger = require("./logger.js");
//const logger = require("./logger.js"); // you should use const, not var. It prevent to overwrite logger like logger = 1.
//logger.log("message");
//logger("message");  //if module.exports = log, you can call like this

const path = require("path");
var pathObj = path.parse(__filename);
console.log(pathObj);

const os = require("os");
var totalMemory = os.totalmem()
var freeMemory = os.freemem()
console.log("Total Memory: " + totalMemory);
// Template String
// ES6 / ES2015 : ECMAScript 6
console.log(`Free Memory: ${freeMemory}`);

const fs = require("fs");
const files = fs.readdirSync('./');  // get all file in current directory, and this is synchronous. But You should use asynchronous one
console.log(files);
fs.readdir("./", function (err, files) { // this is asynchronous(recommended).
    if (err) {
        console, log("Err", err);
    }
    else {
        console.log("Result", files);
    }
});


const Logger = require("./logger");
const logger = new Logger();
//Register a listener
logger.on("messageLogged", function (eventArg) { //if the messgeLogged event is called, wrapped function is called.
    console.log("Listener called", eventArg);
});
logger.on("messageLogged", (arg) => {  // you can short cut like this
    console.log("Listener2", arg);
});

logger.log("Yeyy");


const http = require("http");
const server = http.createServer((req, res) => {  // You create web
    if (req.url === "/") {
        res.write("Hello world");
        res.end();
    }
    if (req.url === "/api/courses") {
        res.write(JSON.stringify([1, 2, 3]));
        res.end();
    }
});
//server.on("connection", (socket) => {  // socket means the parts which are responsible to connetct internet.
//console.log("New connection...");
//})
server.listen(3000); // listen 3000port
console.log("Listening on port 3000...");

