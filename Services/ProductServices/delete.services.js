const Product = require("../../models/product.model");

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
        return res
            .status(500)
            .json({ message: "delete failed: " + error.message });
    }
}

module.exports = {
    deleteProduct,
};
