const ProductType = require("../../models/ProductType.model");

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

module.exports = {
    updateProductType,
};
