const p = new Promise((resolve, reject) => {  // Promise: to hold value or error from asynchronous functions
    //Kick off some async work
    // ...
    setTimeout(() => {
        //resolve(1); // send consumer a value: pending => resolved, fulfilled
        reject(new Error('message---')); // send consumer an error: pending => rejected
    }, 2000);
});

p.then(result => console.log('Result', result))
    .catch(error => console.log('Error', error.message));