const express = require("express");
const router = express.Router();
const MyAuthorized = require("../../../JwtToken/MyAuthorized");

const { getAllDisabledStaff } = require("../../../Services/Staff.services");

router.get("/", MyAuthorized, async (req, res) => {
    try {
        const staffs = await getAllDisabledStaff();
        res.json(staffs);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
