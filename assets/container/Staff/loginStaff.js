const express = require("express");
const router = express.Router();

const { loginStaff } = require("../../../Services/Staff.services");

router.post("/login", async (req, res) => {
    try {
        const { Username, Password } = req.body;
        const loginResult = await loginStaff(Username, Password);
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
