const express = require("express");
const router = express.Router();
const MyAuthorized = require("../../../JwtToken/MyAuthorized");
const { createProvider } = require("../../../Services/Provider.services");

router.use(MyAuthorized);

//create
router.post("/create", async (req, res) => {
    try {
        const newProvider = await createProvider(req.body, res);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
