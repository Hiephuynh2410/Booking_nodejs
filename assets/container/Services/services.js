const express = require("express");
const router = express.Router();
const Services = require("../../../models/services.model");
const ServicesType = require("../../../models/serviceType.model");

//get all
router.get("/", async (req, res) => {
  try {
    const servcies = await Services.findAll({
      where: {
        IsDeleted: true,
      },
      include: [
        {
          model: ServicesType,
          attributes: ["Service_type_id", "Name"],
        },
      ],
    });
    res.json(servcies);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

//create
router.post("/create", async (req, res) => {
  try {
    const { Name, Price, Service_type_id } = req.body;

    if (!Name || !Price || !Service_type_id) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const createdAt = new Date();

    const newService = await Services.create({
      Name,
      Price,
      Service_type_id,
      Created_at: createdAt,
      IsDeleted: true,
    });
    res.status(201).json(newService);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

//update
router.put("/update/:id", async (req, res) => {
  try {
    const servicesId = req.params.id;
    const { Name, Price, Service_type_id } = req.body;

    const Updated_at = new Date();

    const services = await Services.findByPk(servicesId);
    if (!services) {
      return res.status(404).json({ message: "services not found" });
    }

    services.Name = Name || services.Name;
    services.Price = Price || services.Price;
    services.Service_type_id = Service_type_id || services.Service_type_id;
    services.Updated_at = Updated_at;
    await services.save();

    res.json(services);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

//delete
router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const services = await Services.findByPk(id);
    if (!services) {
      return res.status(404).json({ message: "services not found" });
    }

    services.IsDeleted = false;
    await services.save();

    res.json({ message: `services ${id} deleted successfully` });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

//restore
router.patch("/restore/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const services = await Services.findByPk(id);
    if (!services) {
      return res.status(404).json({ message: "services not found" });
    }

    services.IsDeleted = true;
    await services.save();

    res.json({ message: `services type ${id} restored successfully` });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});
module.exports = router;
