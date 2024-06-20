const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const express = require("express");

const genres = require("./routes/genres");
const customers = require("./routes/customers");
const movies = require("./routes/movies");
const Rentals = require("./routes/rentals");
const app = express();
const mongoose = require("mongoose");

// # ------------ Connexion ------------

mongoose
  .connect("mongodb://localhost/vidly")
  .then(() => console.log("Connected to Vidly..."))
  .catch(() => console.log("Couldn't Connect to Vidly !"));

app.use(express.json());

// # ------------ Routes ------------

app.use("/api/genres", genres);
app.use("/api/customers", customers);
app.use("/api/movies", movies);
app.use("/api/rentals", Rentals);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}...`);
});
