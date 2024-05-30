const Product = require("../../models/product.model");
const Provider = require("../../models/provider.model");

async function filterProductByProdvider(Provider_id, res) {
    try {
        const providers = await Product.findAll({
            where: {
                Provider_id: Provider_id,
                IsDeleted: true,
            },
            include: [
                {
                    model: Provider,
                    attributes: ["Name", "Address", "Phone", "Email"],
                },
            ],
        });
        return providers;
    } catch (error) {
        return res
            .status(500)
            .json({ message: "Filter failed: " + error.message });
    }
}

module.exports = {
    filterProductByProdvider,
};
