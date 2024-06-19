const mongoose = require("mongoose");
const Joi = require("joi");
const { genresSchema } = require("./genre");
const schema = mongoose.Schema;

const moviesSchema = new schema({
  title: String,
  genre: genresSchema,
  numberInStock: { type: Number, default: 0 },
  dailyRentalRate: { type: Number, default: 0 },
});

const Movies = mongoose.model("movies", moviesSchema);
const validateData = (gener) => {
  const schema = Joi.object({
    id: Joi.number(),
    title:Joi.string().min(3).required(),
    genre:Joi.required(),
    numberInStock: Joi.number().min(3).required(),
    dailyRentalRate: Joi.number().min(3).required()
  });
  return schema.validate(gener);
};

exports.Movies = Movies;
exports.validate = validateData;
