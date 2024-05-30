const Product = require("../../models/product.model");
const Provider = require("../../models/provider.model");
const ProductType = require("../../models/ProductType.model");

async function GetAllProduct(res) {
    try {
        const products = await Product.findAll({
            where: {
                IsDeleted: true,
            },
            include: [
                {
                    model: Provider,
                    attributes: [
                        "Provider_id",
                        "Name",
                        "Address",
                        "Phone",
                        "Email",
                    ],
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
module.exports = {
    GetAllProduct,
};
