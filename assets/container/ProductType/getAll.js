const express = require("express");
const router = express.Router();
const MyAuthorize = require("../../../JwtToken/MyAuthorized");
const { getAllProductType } = require("../../../Services/ProductType.services");

router.get("/", MyAuthorize, async (req, res) => {
    try {
        const productType = await getAllProductType(req, res);
        res.json(productType);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
