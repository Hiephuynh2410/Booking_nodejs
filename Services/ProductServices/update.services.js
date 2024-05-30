const Product = require("../../models/product.model");
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
module.exports = {
    updateProduct,
};
