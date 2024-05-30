const express = require("express");
const router = express.Router();
const MyAuthorize = require("../../../JwtToken/MyAuthorized");

const {
    GetAllProduct,
} = require("../../../Services/ProductServices/getAll.services");

router.use(MyAuthorize);
//get all product
router.get("/", async (req, res) => {
    try {
        const products = await GetAllProduct(req, res);
        res.json(products);
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
