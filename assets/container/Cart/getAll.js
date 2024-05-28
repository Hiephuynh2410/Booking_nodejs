const express = require("express");
const router = express.Router();
const MyAuthorized = require("../../../JwtToken/MyAuthorized");
const { getAllCart } = require("../../../Services/Cart.services");

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

module.exports = router;
