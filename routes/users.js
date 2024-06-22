const mongoose = require("mongoose");
const { User, validate } = require("../models/user");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const users = await User.find().sort("email");
  res.send(users);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.message);
  const exist = User.findOne("email");
  if (exist) res.status(400).send("this user already Exist !");
  let user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  user = await user.save();
  res.status(200).send(user);
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