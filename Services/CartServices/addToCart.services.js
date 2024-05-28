const Product = require("../../models/product.model");
const Client = require("../../models/client.model");
const Cart = require("../../models/cart.model");

async function addToCart(request) {
    try {
        console.log("Received request:", request);

        if (!request || request.user_id <= 0 || request.Product_id <= 0) {
            throw new Error("Invalid request parameters.");
        }

        const product = await Product.findByPk(request.Product_id);
        const client = await Client.findByPk(request.user_id);

        console.log("Product found:", product);
        console.log("Client found:", client);

        if (!product || !client) {
            throw new Error("Product or client not found.");
        }

        const quantityToAdd = request.Quantity > 0 ? request.Quantity : 1;

        if (product.Quantity < quantityToAdd) {
            throw new Error("Not enough stock available.");
        }
        product.Quantity -= quantityToAdd;
        await product.save();

        let existingCartItem = await Cart.findOne({
            where: {
                user_id: request.user_id,
                Product_id: request.Product_id,
            },
        });

        if (existingCartItem) {
            existingCartItem.Quantity += quantityToAdd;
            await existingCartItem.save();
        } else {
            await Cart.create({
                user_id: request.user_id,
                Product_id: request.Product_id,
                Quantity: quantityToAdd,
            });
        }

        const cartItems = await Cart.findAll({
            where: { user_id: request.user_id },
            include: [{ model: Product }],
        });

        const totalAmount = cartItems.reduce(
            (sum, cartItem) => sum + cartItem.Quantity * cartItem.Product.Price,
            0
        );

        return {
            message: `Product added to the cart successfully. Total amount: ${totalAmount}.`,
            totalAmount,
        };
    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports = { addToCart };
