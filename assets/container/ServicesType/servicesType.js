const express = require("express");
const router = express.Router();
const MyAuthorized = require("../../../JwtToken/MyAuthorized");
const {
  getAllServicesType,
  createServicesType,
  updateServicesType,
  deleteServicesType,
  restoreServicesType,
} = require("../../../Services/ServicesType.services");

router.use(MyAuthorized);
//get all
router.get("/", async (req, res) => {
  try {
    const servicesType = await getAllServicesType(req, res); // Pass req and res objects
    res.json(servicesType);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// //create
router.post("/create", async (req, res) => {
  try {
    const { Name } = req.body;
    const newServicesType = await createServicesType(Name);
    res.status(201).json(newServicesType);
  } catch (error) {
    console.error(error);
    if (error.message === "Missing required fields") {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).send("Internal Server Error");
  }
});

// //update
router.put("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { Name } = req.body;

    const updatedServicesType = await updateServicesType(id, Name);

    res.status(200).json(updatedServicesType);
  } catch (error) {
    console.error(error);
    if (
      error.message === "Name is required" ||
      error.message === "Services type not found"
    ) {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// //deleted
router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await deleteServicesType(id);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
// //restore
router.patch("/restore/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await restoreServicesType(id);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
