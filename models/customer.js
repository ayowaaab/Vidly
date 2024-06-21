const mongoose = require("mongoose");
const Joi = require("joi");

const schema = mongoose.Schema;

const Customer = mongoose.model(
  "Customer",
  new schema({
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
  })
);

function validateCustomer(customer) {
  const schema = Joi.object({
    name: Joi.string().required().min(3).max(30),
    isGold: Joi.boolean().required(),
    phone: Joi.number().required().min(10000000).max(99999999),
  });
  return schema.validate(customer);
}

module.exports.Customer = Customer;
module.exports.validate = validateCustomer;
