const express = require("express");
const router = express.Router();
const MyAuthorize = require("../../../JwtToken/MyAuthorized");

const { createProduct } = require("../../../Services/Product.services");

router.use(MyAuthorize);

// //create
router.post("/create", async (req, res) => {
    try {
        const newProduct = await createProduct(req.body, res);
        res.status(201).json(newProduct);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
