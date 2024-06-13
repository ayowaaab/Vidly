const router = require("express").Router();

router.get("/", async (req, res) => {
  const customer = await Customer.find();
  res.status(200).send(customer);
});

router.get("/:id", async (req, res) => {
  const customerId = new mongoose.Types.ObjectId(req.params.id);
  const customer = await Customer.find({ _id: customerId });
  res.status(200).send(customer);
});

router.post("/", async (req, res) => {
  const { error } = validateData(req.body);
  if (error) return res.status(404).send(error.details[0].message);
  let customer = new Customer.find({
    name: req.body.name,
    phone: req.body.phone,
    isGold: req.body.isGold,
  });
  customer = await customer.save();
  res.status(200).send(customer);
});

router.put("/:id", async (req, res) => {
  const customerId = new mongoose.Types.ObjectId(req.params.id);
  const { error } = validateData(req.body);
  if (error) return res.status(404).send(error.details[0].message);
  const customer = await Customer.findOneAndUpdate(
    customerId,
    {
      name: req.body.name,
      phone: req.body.phone,
      isGold: req.body.isGold,
    },
    { new: true }
  );
  if (!customer) return res.status(404).send("Unknown Customer !!!");
  res.status(200).send(customer);
});

router.delete("/:id", async (req, res) => {
  const customerId = new mongoose.Types.ObjectId(req.params.id);
  const result = await Customer.findByIdAndDelete(customerId);
  if (!result) return res.status(404).send("UNKOWN ID !");
  res.status(200).send("Customer Deleted Succesfully ! ");
});

module.exports = router;
