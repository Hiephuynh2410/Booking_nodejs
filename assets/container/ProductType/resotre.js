const express = require("express");
const router = express.Router();
const MyAuthorize = require("../../../JwtToken/MyAuthorized");
const {
    restoreProductType,
} = require("../../../Services/ProductTypeServices/restore.services");

// //restore
router.patch("/restore/:id", MyAuthorize, async (req, res) => {
    try {
        const { id } = req.params;

        const result = await restoreProductType(id);
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});
module.exports = router;
