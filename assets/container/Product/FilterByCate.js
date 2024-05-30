const express = require("express");
const router = express.Router();
const MyAuthorize = require("../../../JwtToken/MyAuthorized");

const {
    filterProductByCategory,
} = require("../../../Services/ProductServices/filterProductByCategory.services");

router.use(MyAuthorize);

router.get("/filterByCategory/:productTypeId", async (req, res) => {
    try {
        const { productTypeId } = req.params;
        const products = await filterProductByCategory(productTypeId, res);
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
