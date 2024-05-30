const express = require("express");
const router = express.Router();
const MyAuthorize = require("../../../JwtToken/MyAuthorized");

const {
    updateProduct,
} = require("../../../Services/ProductServices/update.services");

router.use(MyAuthorize);

// // Update
router.put("/update/:id", async (req, res) => {
    try {
        const productId = req.params.id;
        const updateData = req.body;
        const updatedProduct = await updateProduct(productId, updateData);
        res.json(updatedProduct);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
