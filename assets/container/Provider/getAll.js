const express = require("express");
const router = express.Router();
const MyAuthorized = require("../../../JwtToken/MyAuthorized");
const { GetallProvider } = require("../../../Services/Provider.services");

router.use(MyAuthorized);
//Get all Provider
router.get("/", async (req, res) => {
    try {
        const provider = await GetallProvider(req, res);
        res.json(provider);
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
