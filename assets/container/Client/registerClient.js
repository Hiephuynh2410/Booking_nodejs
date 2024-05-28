const express = require("express");
const router = express.Router();
const MyAuthorized = require("../../../JwtToken/MyAuthorized");

const { registerClient } = require("../../../Services/Client.services");

router.use(MyAuthorized);

router.post("/register", async (req, res) => {
    try {
        const newClient = await registerClient(req.body, res);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
