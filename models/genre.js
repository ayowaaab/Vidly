const Joi = require("joi");
const mongoose = require("mongoose");

const genresSchema = new mongoose.Schema({
  name: String,
  description: String,
});

const Genre = mongoose.model("genres", genresSchema);

const validateData = (gener) => {
  const schema = Joi.object({
    id: Joi.number(),
    name: Joi.string().min(6).required(),
    description: Joi.string().min(10).required(),
  });
  return schema.validate(gener);
};

exports.Genre = Genre;
exports.genresSchema = genresSchema;
exports.validate = validateData;
