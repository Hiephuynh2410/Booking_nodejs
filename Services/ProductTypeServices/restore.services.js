const ProductType = require("../../models/ProductType.model");

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
        return res
            .status(500)
            .json({ message: "update failed: " + error.message });
    }
}
module.exports = {
    restoreProductType,
};
