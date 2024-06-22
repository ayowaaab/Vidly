const mongoose = require("mongoose");
const Joi = require("joi");
const schema = mongoose.Schema;

const Genre = mongoose.model(
  "Genre",
  new schema({
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 12,
    },
  })
);

function validateGenre(genre) {
  const schema = Joi.object({
    name: Joi.string().required().min(3).max(12),
  });
  return schema.validate(genre);
}

module.exports.Genre = Genre;
module.exports.validate = validateGenre;
