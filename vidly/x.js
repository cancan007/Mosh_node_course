

// Trade off between query performance vs consistency


// Using References (Normalization) -> CONSISTENCY
let author = {
    name: 'Mosh'
}

let course = {
    author: 'id'
}

// Using Embedded Documents (Denormalization) -> PERFORMANCE
let course = {
    author: {
        name: 'Mosh'
    }
}

// Hybrid
let author = {
    name: 'Mosh'
    // 50 other properties
}

let course = {
    author: {
        id: 'ref',
        name: 'Mosh'
    }
}

// Authentiation
// Authorization

// Register: POST /api/users {name, email, password}
// Login: POST /api/logins


// POST /api/returns {customerId, movieId}

// Return 401 if client is not logged in
// Return 400 if customerId is not provided
// Return 400 if movieId is not provided
// Return 404 if no rental found for this customer/movie
// Return 400 if rental already processed
// Return 200 if valid request
// Set the return date
// Calculate the rental fee
// Increase the stock
// Return the rental