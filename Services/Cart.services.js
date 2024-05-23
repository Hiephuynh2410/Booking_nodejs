const Product = require("../models/product.model");
const Client = require("../models/client.model");
const Cart = require("../models/cart.model");

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

module.exports = { getAllCart, addToCart, removeItemFromCart };
