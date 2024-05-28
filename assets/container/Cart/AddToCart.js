const express = require("express");
const router = express.Router();
const MyAuthorized = require("../../../JwtToken/MyAuthorized");
const {
    addToCart,
} = require("../../../Services/CartServices/addToCart.services");

router.use(MyAuthorized);

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

module.exports = router;
