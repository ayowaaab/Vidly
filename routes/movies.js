const router = require("express").Router();
const mongoose = require("mongoose");
const { Movies, validate } = require("../models/movie");

router.get("/", async (req, res) => {
  const movie = await Movies.find();
  res.status(200).send(movie);
});

router.get("/:id", async (req, res) => {
  const movieId = new mongoose.Types.ObjectId(req.params.id);
  const movie = await Movies.find({ _id: movieId });
  res.status(200).send(movie);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(404).send(error.details[0].message);
  let movie = new Movies({
    title: req.body.title,
    genre: req.body.genre,
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate,
  });
  movie = await movie.save();
  res.status(200).send(movie);
});

router.put("/:id", async (req, res) => {
  const movieId = new mongoose.Types.ObjectId(req.params.id);
  const { error } = validate(req.body);
  if (error) return res.status(404).send(error.details[0].message);
  const movie = await Movies.findOneAndUpdate(
    movieId,
    {
      title: req.body.title,
      genre: req.body.genre,
      numberInStock: req.body.numberInStock,
      dailyRentalRate: req.body.dailyRentalRate,
    },
    { new: true }
  );
  if (!movie) return res.status(404).send("Unknown Movies !!!");
  res.status(200).send(movie);
});

router.delete("/:id", async (req, res) => {
  const movieId = new mongoose.Types.ObjectId(req.params.id);
  const result = await Movies.findByIdAndDelete(movieId);
  if (!result) return res.status(404).send("UNKOWN ID !");
  res.status(200).send("Movies Deleted Succesfully ! ");
});

module.exports = router;
