const express = require("express");
const router = express.Router();
const ServicesType = require("../../../models/serviceType.model");

//get all
router.get("/", async (req, res) => {
  try {
    const servicesType = await ServicesType.findAll({
      where: {
        IsDeleted: true, //1:true, 0: false
      },
      attributes: { exclude: ["IsDeleted"] },
    });
    res.json(servicesType);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

//create
router.post("/create", async (req, res) => {
  try {
    const { Name } = req.body;
    if (!Name) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const newServicesType = await ServicesType.create({
      Name,
      IsDeleted: true,
    });
    res.status(201).json(newServicesType);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

//update
router.put("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { Name } = req.body;

    if (!Name) {
      return res.status(400).json({ message: "Name are required" });
    }

    const servicesType = await ServicesType.findByPk(id);

    if (!servicesType) {
      return res.status(404).json({ message: "servicesType not found" });
    }

    await servicesType.update({
      Name,
    });

    res.json(servicesType);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

//deleted
router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const servicesType = await ServicesType.findByPk(id);
    if (!servicesType) {
      return res.status(404).json({ message: "servicesType not found" });
    }

    servicesType.IsDeleted = false;
    await servicesType.save();

    res.json({ message: `servicesType ${id} deleted successfully` });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

//restore
router.patch("/restore/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const servicesType = await ServicesType.findByPk(id);
    if (!servicesType) {
      return res.status(404).json({ message: "servicesType not found" });
    }

    servicesType.IsDeleted = true;
    await servicesType.save();

    res.json({ message: `servicesType ${id} restored successfully` });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});
module.exports = router;
