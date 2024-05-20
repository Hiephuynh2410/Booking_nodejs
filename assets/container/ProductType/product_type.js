const express = require("express");
const router = express.Router();
const MyAuthorize = require("../../../JwtToken/MyAuthorized");
const {
  getAllProductType,
  createProductType,
  updateProductType,
  deleteProductType,
  restoreProductType,
} = require("../../../Services/ProductType.services");

// Get all Staff with IsDisabled = true
router.get("/", MyAuthorize, async (req, res) => {
  try {
    const productType = await getAllProductType(req, res);
    res.json(productType);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// //create
router.post("/create", MyAuthorize, async (req, res) => {
  try {
    const newProductType = await createProductType(req.body);
    res.status(201).json(newProductType);
  } catch (error) {
    console.error(error);

    if (error.message === "Name is required") {
      return res.status(400).json({ message: error.message });
    }

    res.status(500).send("Internal Server Error");
  }
});

// //update
router.put("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedProductType = await updateProductType(id, req.body);
    res.json(updatedProductType);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// //deleted
router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await deleteProductType(id);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// //restore
router.patch("/restore/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await restoreProductType(id);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});
module.exports = router;
