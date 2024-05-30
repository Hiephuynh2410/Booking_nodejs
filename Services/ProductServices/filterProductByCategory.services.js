const Product = require("../../models/product.model");
const ProductType = require("../../models/ProductType.model");

async function filterProductByCategory(productTypeId, res) {
    try {
        const products = await Product.findAll({
            where: {
                Product_type_id: productTypeId,
                IsDeleted: true,
            },
            include: [
                {
                    model: ProductType,
                    attributes: ["Name"],
                },
            ],
        });
        return products;
    } catch (error) {
        return res
            .status(500)
            .json({ message: "Filter failed: " + error.message });
    }
}
module.exports = {
    filterProductByCategory,
};
