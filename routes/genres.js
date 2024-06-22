const mongoose = require("mongoose");
const { Genre, validate } = require("../models/genre");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const genres = await Genre.find();
  res.send(genres);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.message);
  let genre = new Genre({
    name: req.body.name,
  });
  genre = await genre.save();
  res.status(200).send(genre);
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.message);
  const genreId = new mongoose.Types.ObjectId(req.params.id);
  let genre = await Genre.findById(genreId);
  if (!genre)
    return res.status(400).send("Couldn't get the genre with the Given ID !");
  genre.name = req.body.name;
  genre = await genre.save();
  res.send(genre).status(200);
});

router.delete("/:id", async (req, res) => {
  const genreId = new mongoose.Types.ObjectId(req.params.id);
  const genre = await Genre.findByIdAndDelete(genreId)
  if (!genre) res.status(400).send("ID Doesn't Exist !");
  res.status(200).send("Genre Deleted Succesfully");
});

module.exports = router;
