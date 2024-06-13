const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const genre = await Genre.find().sort("name");
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
  let genre = new Genre({
    name: req.body.name,
    description: req.body.description,
  });
  genre = await genre.save();
  res.send(genre);
});

router.put("/:id", async (req, res) => {
  const genreId = new mongoose.Types.ObjectId(req.params.id);
  const { error } = validateData(req.body);
  if (error) return res.send(error.details[0].message).status(400);

  const genre = await Genre.findByIdAndUpdate(
    genreId,
    {
      name: req.body.name,
      description: req.body.description,
    },
    { new: true }
  );

  if (!genre) return res.status(404).send("Gener Not Found !");
  res.status(200).send(genre);
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
