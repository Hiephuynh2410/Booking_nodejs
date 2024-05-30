const express = require("express");
const router = express.Router();
const MyAuthorize = require("../../../JwtToken/MyAuthorized");
const {
    createProductType,
} = require("../../../Services/ProductTypeServices/create.services");

router.post("/create", MyAuthorize, async (req, res) => {
    try {
        const newProductType = await createProductType(req.body);
        res.status(201).json(newProductType);
    } catch (error) {
        console.error(error);

        if (error.message === "Name is required") {
            return res.status(400).json({ message: error.message });
        }

        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
