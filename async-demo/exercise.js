

async function provideMovies() {
    try {
        const customer = await getCustomer(1);
        console.log('Customer', customer);
        if (customer.isGold) {
            const movies = await getTopMovies();
            console.log('TopMovies', movies);
            await sendEmail(customer.email, movies);
            console.log('Email sent...');
        }
    }
    catch (error) {
        console.log('Error', error.message);
    }
}

provideMovies();

function getCustomer(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const customer = {
                id: 1,
                name: 'Mosh Hameani',
                isGold: true,
                email: 'email'
            };
            resolve(customer);
        }, 2000);
    });
}

function getTopMovies() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(['movie1', 'movie2']);
        }, 2000);
    });
}

function sendEmail(email, movies) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, 2000);
    });
}