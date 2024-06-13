const express = require("express");
const genres = require("./routes/genres");
const customers = require("./routes/customers");
const app = express();
const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost/vidly")
  .then(() => console.log("Connected to Vidly..."))
  .catch(() => console.log("Couldn't Connect to Vidly !"));
app.use(express.json());
app.use("/api/genres", genres);
app.use("/api/customers", customers);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}...`);
});
