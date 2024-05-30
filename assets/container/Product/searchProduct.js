const express = require("express");
const router = express.Router();
const MyAuthorize = require("../../../JwtToken/MyAuthorized");

const {
    searchProduct,
} = require("../../../Services/ProductServices/Search.services");

router.use(MyAuthorize);

router.get("/search", async (req, res) => {
    try {
        const { query } = req.query;
        const products = await searchProduct(query);
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
