const mongoose = require("mongoose");
const Joi = require("joi");
const schema = mongoose.Schema;

const User = mongoose.model(
  "User",
  new schema({
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 20,
    },
    email: {
      type: String,
      required: true,
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/,
        "Invalid Email Patterns !",
      ],
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 12,
    },
  })
);

function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().required().min(3).max(20),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6).max(24),
  });
  return schema.validate(user);
}

module.exports.User = User;
module.exports.validate = validateUser;
