const ProductType = require("../../models/ProductType.model");

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

module.exports = {
    getAllProductType,
};
