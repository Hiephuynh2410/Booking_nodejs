const express = require("express");
const router = express.Router();
const MyAuthorized = require("../../../JwtToken/MyAuthorized");
const {
    removeItemFromCart,
} = require("../../../Services/CartServices/DeleteItem.services");

router.use(MyAuthorized);

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
