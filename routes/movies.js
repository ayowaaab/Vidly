const mongoose = require("mongoose");
const { Movie, validate } = require("../models/movie");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const movies = await Movie.find().sort("title");
  res.send(movies);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.message);
  let movie = new Movie({
    title: req.body.title,
    genre: req.body.genre,
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate,
  });
  movie = await movie.save();
  res.status(200).send(movie);
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.message);
  const movieId = new mongoose.Types.ObjectId(req.params.id);
  let movie = await Movie.findById(movieId);
  if (!movie)
    return res.status(400).send("Couldn't get the movie with the Given ID !");

  movie.title = req.body.title;
  movie.genre = req.body.genre;
  movie.numberInStock = req.body.numberInStock;
  movie.dailyRentalRate = req.body.dailyRentalRate;

  movie = await movie.save();
  res.send(movie).status(200);
});

router.delete("/:id", async (req, res) => {
  const movieId = new mongoose.Types.ObjectId(req.params.id);
  const movie = await Movie.findByIdAndDelete(movieId);
  if (!movie) res.status(400).send("ID Doesn't Exist !");
  res.status(200).send("Movie Deleted Succesfully");
});

module.exports = router;
