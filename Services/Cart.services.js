const Product = require("../models/product.model");
const Client = require("../models/client.model");
const Cart = require("../models/cart.model");

async function getAllCart() {
    try {
        const carts = await Cart.findAll({
            where: {
                IsDeleted: true,
            },
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

        const existingCartItem = await Cart.findOne({
            where: {
                user_id: request.user_id,
                Product_id: request.Product_id,
            },
            include: [{ model: Product }, { model: Client }],
        });

        console.log("Existing cart item:", existingCartItem);

        if (existingCartItem) {
            const newTotalQuantity = existingCartItem.Quantity + quantityToAdd;

            if (product.Quantity < newTotalQuantity) {
                throw new Error(
                    "Not enough stock available for the requested quantity."
                );
            }

            existingCartItem.Quantity = newTotalQuantity;
            await existingCartItem.save();
        } else {
            if (product.Quantity >= quantityToAdd) {
                await Cart.create({
                    user_id: request.user_id,
                    Product_id: request.Product_id,
                    Quantity: quantityToAdd,
                });
            } else {
                throw new Error("Product is out of stock.");
            }
        }

        const cartItems = await Cart.findAll({
            where: { user_id: request.user_id },
            include: [{ model: Product }],
        });

        cartItems.forEach((cartItem) => {
            cartItem.TotalAmount = cartItem.Quantity * cartItem.Product.Price;
        });

        await Promise.all(cartItems.map((cartItem) => cartItem.save()));

        const totalAmount = cartItems.reduce(
            (sum, cartItem) => sum + cartItem.TotalAmount,
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
module.exports = { getAllCart, addToCart };
