const express = require("express");
const router = express.Router();
const ProductType = require("../../../models/ProductType.model");

// Get all Staff with IsDisabled = true
router.get("/", async (req, res) => {
  try {
    const productTypes = await ProductType.findAll({
      where: {
        IsDeleted: true, //1:true, 0: false
      },
      attributes: { exclude: ["IsDeleted"] },
    });
    res.json(productTypes);
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
      return res.status(400).json({ message: "Name is required" });
    }
    const newProductType = await ProductType.create({
      Name,
      IsDeleted: true,
    });
    res.status(201).json(newProductType);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

//update
router.put("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { Name } = req.body;

    if (!Name) {
      return res.status(400).json({ message: "Name is required" });
    }

    const productType = await ProductType.findByPk(id);
    if (!productType) {
      return res.status(404).json({ message: "Product type not found" });
    }

    productType.Name = Name;
    await productType.save();

    res.json(productType);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

//deleted
router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const productType = await ProductType.findByPk(id);
    if (!productType) {
      return res.status(404).json({ message: "Product type not found" });
    }

    productType.IsDeleted = false;
    await productType.save();

    res.json({ message: `Product type ${id} deleted successfully` });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

//restore
router.patch("/restore/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const productType = await ProductType.findByPk(id);
    if (!productType) {
      return res.status(404).json({ message: "Product type not found" });
    }

    productType.IsDeleted = true;
    await productType.save();

    res.json({ message: `Product type ${id} restored successfully` });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});
module.exports = router;
