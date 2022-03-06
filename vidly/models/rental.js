const mongoose = require('mongoose');
const moment = require('moment');
const Joi = require('joi');


const rentalSchema = mongoose.Schema({
    customer: {
        type: new mongoose.Schema({ //customerSchema
            name: {
                type: String,
                required: true,
                minlength: 5,
                maxlength: 50
            },
            isGold: {
                type: Boolean,
                default: false
            },
            phone: {
                type: String,
                required: true,
                minlength: 5,
                maxlength: 50
            }
        })
    },
    movie: {
        type: new mongoose.Schema({  //movieSchema
            title: {
                type: String,
                required: true,
                trim: true,
                minlength: 5,
                maxlength: 255
            },
            dailyRentalRate: {
                type: Number,
                required: true,
                min: 0,
                max: 255
            }
        }),
        required: true
    },
    dateOut: {
        type: Date,
        required: true,
        default: Date.now
    },
    dateReturned: {
        type: Date
    },
    rentalFee: {
        type: Number,
        min: 0
    }
});

// schema.statics: this function is called on a class directly, like 'Rental.lookup()'
rentalSchema.statics.lookup = async function (customerId, movieId) {
    return await this.findOne({
        'customer._id': customerId,
        'movie._id': movieId
    });
};

// schema.methods: Instance function like 'new User().generateAuthToken'
rentalSchema.methods.return = async function () {
    this.dateReturned = new Date();

    const rentalDays = moment().diff(this.dateOut, 'days');
    this.rentalFee = rentalDays * this.movie.dailyRentalRate;
}

function validateRental(rental) {
    const schema = Joi.object({
        customerId: Joi.objectId().required(),
        movieId: Joi.objectId.required(),
        rentalFee: Joi.number()
    });
    return schema.validate(rental);
};

async function removeRental(rentalId) {
    await Rental.findByIdAndDelete(rentalId);
}

const Rental = mongoose.model('Rental', rentalSchema);

exports.Rental = Rental;
exports.validate = validateRental;
exports.removeRental = removeRental;