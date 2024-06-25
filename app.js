const mongoose = require("mongoose");
const express = require("express");
const app = express();
const config = require("config");
const genres = require("./routes/genres");
const customers = require("./routes/customers");
const movies = require("./routes/movies");
const rentals = require("./routes/rentals");
const users = require("./routes/users");
const auth = require("./routes/auth");
const token = require('./middleware/auth');

if (!config.get("jwtPrivateKey")) {
  console.error("FATAL ERROR : jwtPrivateKey not defined");
  process.exit(1);
}

mongoose
.connect("mongodb://localhost/vidly")
.then(() => console.log("Connected to MonogoDB..."))
.catch(() => console.log("Couldn't connect to MonogoDB..."));

app.use(express.json());
app.use(token);
app.use("/api/genres", genres);
app.use("/api/customers", customers);
app.use("/api/movies", movies);
app.use("/api/rentals", rentals);
app.use("/api/users", users);
app.use("/api/auth", auth);

const port = process.env.PORT | 3000;
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
