const ProductType = require("../../models/ProductType.model");

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

module.exports = {
    createProductType,
};
