const express = require("express");
const router = express.Router();
const Product = require("../../../models/product.model");
const Provider = require("../../../models/provider.model");
const ProductType = require("../../../models/ProductType.model");

//get all product
router.get("/", async (req, res) => {
  try {
    const products = await Product.findAll({
      where: {
        IsDeleted: true,
      },
      include: [
        {
          model: Provider,
          attributes: ["Provider_id", "Name", "Address", "Phone", "Email"],
        },
        {
          model: ProductType,
          attributes: ["Product_type_id", "Name"],
        },
      ],
    });
    res.json(products);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

//create
router.post("/create", async (req, res) => {
  try {
    const {
      Name,
      Description,
      Price,
      Quantity,
      Product_type_id,
      Image,
      Provider_id,
      Sold,
      IsDeleted,
    } = req.body;

    if (!Name || !Price || !Quantity || !Product_type_id || !Provider_id) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const createdAt = new Date();
    const newProduct = await Product.create({
      Name,
      Description,
      Price,
      Quantity,
      Product_type_id,
      Image,
      Provider_id,
      Created_at: createdAt,
      Sold,
      IsDeleted: true,
    });

    res.status(201).json(newProduct);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Update
router.put("/update/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const {
      Name,
      Description,
      Price,
      Quantity,
      Product_type_id,
      Image,
      Provider_id,
      Sold,
    } = req.body;

    const Updated_at = new Date();

    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    product.Name = Name || product.Name;
    product.Description = Description || product.Description;
    product.Price = Price || product.Price;
    product.Quantity = Quantity || product.Quantity;
    product.Product_type_id = Product_type_id || product.Product_type_id;
    product.Image = Image || product.Image;
    product.Provider_id = Provider_id || product.Provider_id;
    product.Sold = Sold || product.Sold;
    product.Updated_at = Updated_at;
    await product.save();

    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

//delete
router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    product.IsDeleted = false;
    await product.save();

    res.json({ message: `Product ${id} deleted successfully` });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

//restore
router.patch("/restore/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    product.IsDeleted = true;
    await product.save();

    res.json({ message: `Product type ${id} restored successfully` });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});
module.exports = router;
