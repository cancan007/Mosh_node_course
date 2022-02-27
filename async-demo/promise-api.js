/*
const p = Promise.reject('reason for rejection...');
p.then((result) => console.log(result))
    .catch((error) => console.log(error));
    */

const p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log('Async operation1...');
        resolve(1);
        //reject(new Error('because something failed...'));
    }, 2000);
});

const p2 = new Promise((resolve) => {
    setTimeout(() => {
        console.log('Async operation2...');
        resolve(2);
    }, 2000);
});

//Promise.all([p1, p2])  // return value array after all async funcs are done
Promise.race([p1, p2])  // return first value whose aync func completed first
    .then(result => console.log(result))
    .catch(error => console.log('Error', error.message));