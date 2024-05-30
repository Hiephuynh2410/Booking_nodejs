const Product = require("../../models/product.model");
const Provider = require("../../models/provider.model");
const ProductType = require("../../models/ProductType.model");
const { Op } = require("sequelize");
const removeAccents = require("remove-accents");

async function searchProduct(query) {
    try {
        const normalizedQuery = removeAccents(query).toLowerCase();

        const products = await Product.findAll({
            where: {
                [Op.or]: [
                    {
                        Product_id: query,
                    },
                    {
                        Name: {
                            [Op.like]: `%${normalizedQuery}%`,
                        },
                    },
                ],
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
        console.error("Error searching products: ", error);
        throw error;
    }
}
module.exports = {
    searchProduct,
};
