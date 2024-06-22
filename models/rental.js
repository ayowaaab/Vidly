const mongoose = require("mongoose");
const Joi = require("joi");

const schema = mongoose.Schema;

const Rental = mongoose.model("Rental", new schema({}));

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
module.exports.validate = validateMovie;
