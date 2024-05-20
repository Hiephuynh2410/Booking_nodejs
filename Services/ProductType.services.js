const ProductType = require("../models/ProductType.model");

async function getAllProductType(res) {
  try {
    const productTypes = await ProductType.findAll({
      where: {
        IsDeleted: true, //1:true, 0: false
      },
      attributes: { exclude: ["IsDeleted"] },
    });
    return productTypes;
  } catch (error) {
    return res
      .status(500)
      .json({ message: "get all failed: " + error.message });
  }
}

async function createProductType(data) {
  try {
    const { Name } = data;
    if (!Name) {
      throw new Error("Name is required");
    }

    const newProductType = await ProductType.create({
      Name,
      IsDeleted: true,
    });

    return newProductType;
  } catch (error) {
    return res
      .status(500)
      .json({ message: "get all failed: " + error.message });
  }
}

async function updateProductType(id, data) {
  try {
    const { Name } = data;
    if (!Name) {
      throw new Error("Name is required");
    }

    const productType = await ProductType.findByPk(id);
    if (!productType) {
      throw new Error("Product type not found");
    }

    productType.Name = Name;
    await productType.save();

    return productType;
  } catch (error) {
    throw new Error("Failed to update product type: " + error.message);
  }
}

async function deleteProductType(id) {
  try {
    const productType = await ProductType.findByPk(id);

    if (!productType) {
      throw new Error("productType not found");
    }

    productType.IsDeleted = false;

    await productType.save();

    return {
      success: true,
      message: `productType ${id} deleted successfully`,
    };
  } catch (error) {
    return res.status(500).json({ message: "update failed: " + error.message });
  }
}

async function restoreProductType(id) {
  try {
    const productType = await ProductType.findByPk(id);

    if (!productType) {
      throw new Error("productType not found");
    }

    productType.IsDeleted = true;

    await productType.save();

    return {
      success: true,
      message: `productType ${id} restore successfully`,
    };
  } catch (error) {
    return res.status(500).json({ message: "update failed: " + error.message });
  }
}
module.exports = {
  getAllProductType,
  createProductType,
  updateProductType,
  deleteProductType,
  restoreProductType,
};
