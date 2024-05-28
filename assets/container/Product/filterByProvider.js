const express = require("express");
const router = express.Router();
const MyAuthorize = require("../../../JwtToken/MyAuthorized");

const {
    filterProductByProdvider,
} = require("../../../Services/Product.services");

router.use(MyAuthorize);

router.get("/filterByProvider/:providerId", async (req, res) => {
    try {
        const { providerId } = req.params;
        const provider = await filterProductByProdvider(providerId, res);
        res.json(provider);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
