const mongoose = require("mongoose");
const { Customer, validate } = require("../models/customer");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const customers = await Customer.find();
  res.send(customers);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.message);
  let customer = new Customer({
    name: req.body.name,
    isGold: req.body.isGold,
    phone: req.body.phone,
  });
  customer = await customer.save();
  res.status(200).send(customer);
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.message);
  const customerId = new mongoose.Types.ObjectId(req.params.id);
  let customer = await Customer.findById(customerId);
  if (!customer)
    return res
      .status(400)
      .send("Couldn't get the customer with the Given ID !");

  customer.name = req.body.name;
  customer.isGold = req.body.isGold;
  customer.phone = req.body.phone;
  
  customer = await customer.save();
  res.send(customer).status(200);
});

router.delete("/:id", async (req, res) => {
  const customerId = new mongoose.Types.ObjectId(req.params.id);
  const customer = await Customer.findByIdAndDelete(customerId);
  if (!customer) res.status(400).send("ID Doesn't Exist !");
  res.status(200).send("Customer Deleted Succesfully");
});

module.exports = router;
