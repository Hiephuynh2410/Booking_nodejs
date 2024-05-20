const Product = require("../models/product.model");
const Provider = require("../models/provider.model");
const ProductType = require("../models/ProductType.model");

async function GetAllProduct(res) {
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
    return products;
  } catch (error) {
    return res
      .status(500)
      .json({ message: "get all failed: " + error.message });
  }
}

async function createProduct(data) {
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
    } = data;

    if (
      !Name ||
      !Description ||
      !Price ||
      !Quantity ||
      !Image ||
      !Product_type_id ||
      !Provider_id ||
      !Sold
    ) {
      throw new Error("Missing required fields");
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
      IsDeleted: true,
    });

    return newProduct;
  } catch (error) {
    return res
      .status(500)
      .json({ message: "get all failed: " + error.message });
  }
}

async function updateProduct(productId, updateData) {
  try {
    const product = await Product.findByPk(productId);
    if (!product) {
      throw new Error("Product not found");
    }

    const updatedProduct = await product.update(updateData);

    return updatedProduct;
  } catch (error) {
    throw new Error("Update failed: " + error.message);
  }
}

async function deleteProduct(id, res) {
  try {
    const product = await Product.findByPk(id);

    if (!product) {
      throw new Error("product not found");
    }

    product.IsDeleted = false;

    await product.save();

    return { success: true, message: "product deleted successfully" };
  } catch (error) {
    return res.status(500).json({ message: "delete failed: " + error.message });
  }
}

async function restoreProduct(id, res) {
  try {
    const product = await Product.findByPk(id);

    if (!product) {
      throw new Error("product not found");
    }

    product.IsDeleted = true;

    await product.save();

    return { success: true, message: "product restore successfully" };
  } catch (error) {
    return res.status(500).json({ message: "delete failed: " + error.message });
  }
}
module.exports = {
  GetAllProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  restoreProduct,
};
