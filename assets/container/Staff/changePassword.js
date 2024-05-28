const express = require("express");
const router = express.Router();
const { changeStaffPassword } = require("../../../Services/Staff.services");

router.put("/changePassword/:token", async (req, res) => {
    try {
        const { token } = req.params;
        const { newPassword } = req.body;

        const result = await changeStaffPassword(token, newPassword);
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
