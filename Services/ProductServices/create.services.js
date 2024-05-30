const Product = require("../../models/product.model");

async function createProduct(data) {
    try {
        const {
            Name,
            Description,
            Price,
            Quantity,
            Product_type_id,
            Image,
            Provider_id,
            Sold,
        } = data;

        if (
            !Name ||
            !Description ||
            !Price ||
            !Quantity ||
            !Image ||
            !Product_type_id ||
            !Provider_id ||
            !Sold
        ) {
            throw new Error("Missing required fields");
        }

        const createdAt = new Date();
        const newProduct = await Product.create({
            Name,
            Description,
            Price,
            Quantity,
            Product_type_id,
            Image,
            Provider_id,
            Created_at: createdAt,
            IsDeleted: true,
        });

        return newProduct;
    } catch (error) {
        return res
            .status(500)
            .json({ message: "get all failed: " + error.message });
    }
}

module.exports = {
    createProduct,
};
