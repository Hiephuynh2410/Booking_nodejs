const express = require("express");
const router = express.Router();
const MyAuthorized = require("../../../JwtToken/MyAuthorized");
const {
    getAllCart,
    addToCart,
    removeItemFromCart,
} = require("../../../Services/Cart.services");

router.use(MyAuthorized);
router.get("/", async (req, res) => {
    try {
        const cart = await getAllCart();
        res.json(cart);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

router.post("/addToCart", async (req, res) => {
    try {
        const request = req.body;
        const result = await addToCart(request);
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});

router.delete(
    "/removeFromCart/:userId/:productId/:quantity",
    async (req, res) => {
        try {
            const { userId, productId, quantity } = req.params;
            const result = await removeItemFromCart(
                parseInt(userId),
                parseInt(productId),
                parseInt(quantity)
            );
            res.json(result);
        } catch (error) {
            console.error(error);
            res.status(500).send("Internal Server Error: " + error.message);
        }
    }
);

module.exports = router;
