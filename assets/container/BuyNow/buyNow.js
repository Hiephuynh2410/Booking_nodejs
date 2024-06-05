const express = require("express");
const router = express.Router();
const MyAuthorize = require("../../../JwtToken/MyAuthorized");
const { BuyNow } = require("../../../Services/BuyNow/buyNow.services");
const { ValidationError } = require("sequelize");

router.use(MyAuthorize);

router.post("/", async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;

        const response = await BuyNow(userId, productId, quantity);
        res.status(200).json({ message: response });
    } catch (error) {
        console.error("Error:", error.message);

        if (error instanceof ValidationError) {
            res.status(400).json({ error: error.message });
        } else if (error.name === "SequelizeDatabaseError") {
            res.status(500).json({ error: "Database Error" });
        } else {
            res.status(500).json({ error: error.message });
        }
    }
});

module.exports = router;
