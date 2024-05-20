const express = require("express");
const router = express.Router();
const MyAuthorized = require("../../../JwtToken/MyAuthorized");
const {
  GetallProvider,
  createProvider,
  updateProvider,
  deleteProvider,
  restoreProvider,
} = require("../../../Services/Provider.services");

router.use(MyAuthorized);
//Get all Provider
router.get("/", async (req, res) => {
  try {
    const provider = await GetallProvider(req, res);
    res.json(provider);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

//create
router.post("/create", async (req, res) => {
  try {
    const newProvider = await createProvider(req.body, res);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// //update
router.put("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { Name, Address, Phone, Email } = req.body;

    const updatedProvider = await updateProvider(
      { Name, Address, Phone, Email },
      id
    );

    res.json(updatedProvider);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// //delete
router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await deleteProvider(id);
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

// //restore
router.patch("/restore/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await restoreProvider(id);
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});
module.exports = router;
