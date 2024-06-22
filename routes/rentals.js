const _ = require("lodash");
const mongoose = require("mongoose");
const { Rental, validate } = require("../models/rental");
const { Movie } = require("../models/movie");
const { Customer } = require("../models/customer");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const rentals = await Rental.find().sort("-dateOut");
  res.send(rentals);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.message);

  const customerId = new mongoose.Types.ObjectId(req.body.customerId);
  const customer = await Customer.findById(customerId);
  if (!customer) return res.status(400).send("Invalid Customer ID !");

  const movieId = new mongoose.Types.ObjectId(req.body.movieId);
  const movie = await Movie.findById(movieId);
  if (!movie) return res.status(400).send("Invalid Movie ID !");

  if (movie.numberInStock === 0)
    return res.status(400).send("Movie Not in Stock !");
  let rental = new Rental(_.pick(req.body));
  rental.customer = _.pick(customer, ["name", "isGold", "phone"]);
  rental.movie = _.pick(movie, ["title", "dailyRentalRate"]);
  rental = await rental.save();
  movie.numberInStock--;
  movie.save();
  res.status(200).send(rental);
});

// router.put("/:id", async (req, res) => {
//   const { error } = validate(req.body);
//   if (error) return res.status(400).send(error.message);
//   const rentalId = new mongoose.Types.ObjectId(req.params.id);
//   let rental = await Rental.findById(rentalId);
//   if (!rental)
//     return res.status(400).send("Couldn't get the rental with the Given ID !");
//   rental.name = req.body.name;
//   rental = await rental.save();
//   res.send(rental).status(200);
// });

router.delete("/:id", async (req, res) => {
  const rentalId = new mongoose.Types.ObjectId(req.params.id);
  const rental = await Rental.findByIdAndDelete(rentalId);
  if (!rental) res.status(400).send("ID Doesn't Exist !");
  res.status(200).send("Rental Deleted Succesfully");
});

module.exports = router;
