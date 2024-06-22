const mongoose = require("mongoose");
const Joi = require("joi")
Joi.objectId = require("joi-objectid")(Joi);

const schema = mongoose.Schema;

const Rental = mongoose.model(
  "Rental",
  new schema({
    customer: {
      type: new schema({
        name: {
          type: String,
          required: true,
          minlength: 5,
        },
        isGold: {
          type: Boolean,
          required: true,
        },
        phone: {
          type: Number,
          required: true,
          validate: {
            validator: (v) => v.toString().length >= 3,
            message: (props) =>
              `${props.value} is shorter than the minimum allowed length (8 digits).`,
          },
        },
      }),
      required: true,
    },
    movie: {
      type: new schema({
        title: {
          type: String,
          required: true,
          minlength: 3,
          maxlength: 30,
        },
        dailyRentalRate: {
          type: Number,
          required: true,
          min: 0,
          max: 255,
        },
      }),
      required: true,
    },
    dateOut: {
      type: Date,
      default: Date.now,
    },
    dateReturned: {
      type: Date,
    },
    rentalFee: {
      type: Number,
      min: 0,
    },
  })
);

function validateRental(rental) {
  const schema = Joi.object({
    customerId: Joi.objectId().required(),
    movieId: Joi.objectId().required(),
  });
  return schema.validate(rental);
}

module.exports.Rental = Rental;
module.exports.validate = validateRental;
