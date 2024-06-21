const mongoose = require("mongoose");
const Joi = require("joi");

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
        genre: {
          type: String,
          required: true,
          minlength: 3,
          maxlength: 12,
        },
        numberInStock: {
          type: Number,
          required: true,
          min: 0,
          max: 255,
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
      type: date,
      default: date.now(),
    },
    dateReturned: {
      type: date,
      default: date.now(),
    },
  })
);

function validateRental(rental) {
  const schema = Joi.object({
    title: Joi.string().required().min(3).max(30),
    genre: Joi.string().required().min(3).max(12),
    numberInStock: Joi.number().required().min(0).max(255),
    dailyRentalRate: Joi.number().required().min(0).max(255),
  });
  return schema.validate(rental);
}

module.exports.Rental = Rental;
module.exports.validate = validateRental;
