const express = require("express");
const router = express.Router();
const MyAuthorized = require("../../../JwtToken/MyAuthorized");

const { loginClient } = require("../../../Services/Client.services");

router.use(MyAuthorized);

router.post("/login", async (req, res) => {
    try {
        const { Username, Password } = req.body;
        const loginResult = await loginClient(Username, Password);
        if (loginResult.success) {
            res.json(loginResult);
        } else {
            res.status(400).json(loginResult);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
