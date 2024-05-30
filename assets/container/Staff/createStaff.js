const express = require("express");
const router = express.Router();
const MyAuthorized = require("../../../JwtToken/MyAuthorized");

const {
    registerStaff,
} = require("../../../Services/StaffServices/register.services");

router.post("/register", async (req, res) => {
    try {
        const newStaff = await registerStaff(req.body, res);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
