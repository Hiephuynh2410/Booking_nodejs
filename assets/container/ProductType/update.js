const express = require("express");
const router = express.Router();
const MyAuthorize = require("../../../JwtToken/MyAuthorized");
const { updateProductType } = require("../../../Services/ProductType.services");

// //update
router.put("/update/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const updatedProductType = await updateProductType(id, req.body);
        res.json(updatedProductType);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
