const Product = require("../../models/product.model");
const Client = require("../../models/client.model");
const Cart = require("../../models/cart.model");

async function getAllCart() {
    try {
        const carts = await Cart.findAll({
            include: [
                {
                    model: Product,
                    attributes: ["Product_id", "Price", "Name"],
                },
                {
                    model: Client,
                    attributes: ["Client_id", "Name", "Email"],
                },
            ],
        });
        return carts;
    } catch (error) {
        console.error("Error fetching cart items:", error);
        throw new Error("Could not fetch cart items");
    }
}

module.exports = { getAllCart };
