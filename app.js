const express = require("express");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();
const genres = require("./routes/genres");
const movies = require("./routes/movies");
// const rentals = require("./routes/rentals");
// const users = require("./routes/users");
mongoose
  .connect("mongodb://localhost/vidly")
  .then(() => console.log("Connected to MonogoDB..."))
  .catch(() => console.log("Couldn't connect to MonogoDB..."));

app.use(express.json());
app.use("/api/genres", genres);
app.use("/api/movies", movies);

// app.use("/api/rentals", rentals);
// app.use("/api/users", users)

const port = process.env.PORT | 3000;
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
