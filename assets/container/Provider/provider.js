const express = require("express");
const router = express.Router();
const Provider = require("../../../models/provider.model");

//Get all Provider
router.get("/", async (req, res) => {
  try {
    const providers = await Provider.findAll({
      where: {
        IsDeleted: true,
      },
      attributes: { exclude: ["IsDeleted"] },
    });
    res.json(providers);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

//create
router.post("/create", async (req, res) => {
  try {
    const { Name, Address, Phone, Email } = req.body;

    if (!Name || !Address || !Phone || !Email) {
      return res
        .status(400)
        .json({ message: "Please provide all necessary information" });
    }

    const newProvider = await Provider.create({
      Name,
      Address,
      Phone,
      Email,
      IsDeleted: true,
    });

    res.status(201).json(newProvider);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

//update
router.put("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { Name, Address, Phone, Email } = req.body;

    if (!Name || !Address || !Phone || !Email) {
      return res
        .status(400)
        .json({ message: "Name, Address, Phone, and Email are required" });
    }

    let provider = await Provider.findByPk(id);

    if (!provider) {
      return res.status(404).json({ message: "Provider not found" });
    }

    provider.Name = Name;
    provider.Address = Address;
    provider.Phone = Phone;
    provider.Email = Email;

    await provider.save();

    res.json(provider);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

//delete
router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const provider = await Provider.findByPk(id);
    if (!provider) {
      return res.status(400).json({ message: "Provider not found" });
    }

    provider.IsDeleted = false;
    await provider.save();

    res.json({ message: `Provider ${id} is deleted successfully` });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

//restore
router.patch("/restore/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const provider = await Provider.findByPk(id);
    if (!provider) {
      return res.status(404).json({ message: "provider not found" });
    }

    provider.IsDeleted = true;
    await provider.save();

    res.json({ message: `provider ${id} restored successfully` });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});
module.exports = router;
