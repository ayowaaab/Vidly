const mongoose = require("mongoose");
const Joi = require("joi");

const customerSchema = new mongoose.Schema({
  name: { type: String, minlength: 5, maxlength: 5, required: true },
  phone: Number,
  isGold: Boolean,
});
const Customer = mongoose.model("customer", customerSchema);

const validateData = (customer) => {
  const schema = Joi.object({
    id: Joi.number(),
    name: Joi.string().min(5).required(),
    phone: Joi.number().min(6).required(),
    isGold: Joi.boolean().required(),
  });
  return schema.validate(customer);
};

exports.Customer = Customer;
exports.validate = validateData;
