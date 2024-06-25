const { User } = require("../models/user");
const express = require("express");
const Joi = require("joi");
const { verifyPassword } = require("../hash");
const router = express.Router();

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.message);

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Email or password Doesn't Exist !");

  const verify = await verifyPassword(req.body.password, user.password);
  if (verify) return res.status(200).send("Authenticated successfully");

  return res.status(400).send("Invalid credentials !");
});

async function validate(user) {
  const schema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6).max(24),
  });
  return schema.validate(user);
}
module.exports = router;
