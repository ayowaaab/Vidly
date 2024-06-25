const mongoose = require("mongoose");
const Joi = require("joi");
const schema = mongoose.Schema;
const jwt = require("jsonwebtoken");
const config = require("config");

const userSchema = new schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 20,
  },
  email: {
    type: String,
    required: true,
    match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Invalid Email Patterns !"],
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
  },
});

userSchema.methods.generateAuthToken = function (user, key) {
  return jwt.sign({ _id: this._id }, config.get("jwtPrivateKey"));
};
const User = mongoose.model("User", userSchema);

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
