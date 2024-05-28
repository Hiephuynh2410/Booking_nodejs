const express = require("express");
const router = express.Router();
const MyAuthorize = require("../../../JwtToken/MyAuthorized");
const { deleteProductType } = require("../../../Services/ProductType.services");

// //deleted
router.delete("/delete/:id", MyAuthorize, async (req, res) => {
    try {
        const { id } = req.params;

        const result = await deleteProductType(id);
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
