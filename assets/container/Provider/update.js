const express = require("express");
const router = express.Router();
const MyAuthorized = require("../../../JwtToken/MyAuthorized");
const {
    updateProvider,
} = require("../../../Services/ProviderServices/update.services");

router.use(MyAuthorized);

router.put("/update/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { Name, Address, Phone, Email } = req.body;

        const updatedProvider = await updateProvider(
            { Name, Address, Phone, Email },
            id
        );

        res.json(updatedProvider);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
