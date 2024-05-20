const express = require("express");
const router = express.Router();
const MyAuthorized = require("../../../JwtToken/MyAuthorized");
const {
  GetAllServices,
  createService,
  updateServices,
  deleteServices,
  restoreServices,
} = require("../../../Services/Services.services");

router.use(MyAuthorized);
//get all
router.get("/", async (req, res) => {
  try {
    const services = await GetAllServices(req, res);
    res.json(services);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

// //create
router.post("/create", async (req, res) => {
  try {
    const { Name, Price, Service_type_id } = req.body;

    const newService = await createService(Name, Price, Service_type_id);
    res.status(201).json(newService);
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
    const { Name, Price, UpdateAt } = req.body;

    const updatedServices = await updateServices(id, Name, Price, UpdateAt);

    res.status(200).json(updatedServices);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// //delete
router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await deleteServices(id);
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

    const result = await restoreServices(id);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
module.exports = router;
