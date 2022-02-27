const mongoose = require('mongoose');
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