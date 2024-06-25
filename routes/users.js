const mongoose = require("mongoose");
const { hashPassword } = require("../hash");
const { User, validate } = require("../models/user");
const _ = require("lodash");
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const config = require("config");

router.get("/", async (req, res) => {
  const users = await User.find().sort("email").select("-_id -__v");
  res.send(users);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("this user already Exist !");

  const hashed = await hashPassword(req.body.password);
  user = new User(_.pick(req.body, ["name", "email", "password"]));
  user.password = hashed;
  user = await user.save();

  const token = jwt.sign({ _id: user._id }, config.get("jwtPrivateKey"));
  res
    .header("x-auth-token", token)
    .status(200)
    .send(_.pick(user, ["name", "email", "password"]));
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.message);
  const userId = new mongoose.Types.ObjectId(req.params.id);
  let user = await User.findById(userId);
  if (!user)
    return res.status(400).send("Couldn't get the user with the Given ID !");
  user.name = req.body.name;
  user = await user.save();
  res.send(user).status(200);
});

router.delete("/:id", async (req, res) => {
  const userId = new mongoose.Types.ObjectId(req.params.id);
  const user = await User.findByIdAndDelete(userId);
  if (!user) res.status(400).send("ID Doesn't Exist !");
  res.status(200).send("User Deleted Succesfully");
});

module.exports = router;
