const express = require("express");
const router = express.Router();
const Joi = require("joi");
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/vidly")
  .then(() => console.log("Connected to Vidly..."))
  .catch(() => console.log("Couldn't Connect to Vidly !"));

const genresSchema = new mongoose.Schema({
  name: String,
  description: String,
});

const Genre = mongoose.model("genres", genresSchema);

const validateData = (gener) => {
  const schema = Joi.object({
    id: Joi.number(),
    name: Joi.string().min(6).required(),
    description: Joi.string().min(10).required(),
  });
  return schema.validate(gener);
};

router.get("/", async (req, res) => {
  const genre = await Genre.find().sort('name');
  res.send(genre);
});

router.get("/:id", async (req, res) => {
  var genreId = new mongoose.Types.ObjectId(req.params.id);
  const genre = await Genre.find({
    _id: genreId,
  });
  if (genre.length === 0) return res.send("Gener Not Found !").status(404);
  res.send(genre);
});

router.post("/", async (req, res) => {
  const { error } = validateData(req.body);
  if (error) return res.send(error.details[0].message).status(400);
  const genre = new Genre({
    name: req.body.name,
    description: req.body.description,
  });
  const result = await genre.save();
  res.send(genre);

  res.send(result);
});

router.put("/:id", async (req, res) => {
  const genreId = new mongoose.Types.ObjectId(req.params.id);
  const genre = await Genre.findOne({
    _id: genreId,
  });
  if (!genre) return res.send("Gener Not Found !").status(404);
  const { error } = validateData(req.body);
  if (error) return res.send(error.details[0].message).status(400);
  genre.name = req.body.name;
  genre.description = req.body.description;
  const result = await genre.save();
  res.send(result).status(200);
});

router.delete("/:id", async (req, res) => {
  const genreId = new mongoose.Types.ObjectId(req.params.id);
  const genre = await Genre.find({
    _id: genreId,
  });
  if (genre.length === 0) return res.sendStatus(404).send("Gener Not Found !");
  await Genre.deleteOne({ _id: genreId });
  res.status(200).send("Deleted Succesfully");
});

module.exports = router;
