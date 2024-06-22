const mongoose = require("mongoose");
const Joi = require("joi");
const schema = mongoose.Schema;

const Movie = mongoose.model(
  "Movie",
  new schema({
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
  })
);

function validateMovie(movie) {
  const schema = Joi.object({
    title: Joi.string().required().min(3).max(30),
    genre: Joi.string().required().min(3).max(12),
    numberInStock: Joi.number().required().min(0).max(255),
    dailyRentalRate: Joi.number().required().min(0).max(255),
  });
  return schema.validate(movie);
}

module.exports.Movie = Movie;
module.exports.validate = validateMovie;
