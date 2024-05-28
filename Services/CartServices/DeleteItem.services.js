const Product = require("../../models/product.model");
const Client = require("../../models/client.model");
const Cart = require("../../models/cart.model");

async function removeItemFromCart(userId, productId, quantity) {
    try {
        if (userId <= 0 || productId <= 0 || quantity <= 0) {
            throw new Error("Invalid request parameters.");
        }

        const existingCartItem = await Cart.findOne({
            where: {
                user_id: userId,
                Product_id: productId,
            },
            include: [{ model: Product }],
        });

        if (!existingCartItem) {
            throw new Error("CartItem not found.");
        }

        const cartQuantity = existingCartItem.Quantity;

        if (quantity > cartQuantity) {
            throw new Error(
                `Quantity to remove (${quantity}) exceeds quantity in the cart (${cartQuantity}).`
            );
        }

        const productPrice = existingCartItem.Product.Price;

        existingCartItem.Quantity -= quantity;
        await existingCartItem.save();

        const cartItems = await Cart.findAll({
            where: { user_id: userId },
            include: [{ model: Product }],
        });

        const totalAmount = cartItems.reduce((total, item) => {
            return total + item.Quantity * item.Product.Price;
        }, 0);

        existingCartItem.Product.Quantity += quantity;
        await existingCartItem.Product.save();

        const remainingQuantity = existingCartItem.Quantity;

        return {
            message: `Product has ${remainingQuantity} left in the cart. Product removed successfully.`,
            totalAmount: totalAmount.toFixed(2),
        };
    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports = { removeItemFromCart };
