const Joi = require("joi");

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 24,
  },
});

const User = mongoose.model("user", userSchema);

function validateUser(user) {
  const schema = {
    name: Joi.string().min(5).required(),
    email: Joi.string().min(12).required(),
    password: Joi.string().min(8).required(),
  };

  return Joi.validate(user, schema);
}

exports.genreSchema = userSchema;
exports.User = User;
exports.validate = validateUser;
