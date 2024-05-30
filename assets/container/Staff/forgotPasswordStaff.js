const express = require("express");
const router = express.Router();

const {
    forgotPassword,
} = require("../../../Services/StaffServices/forgotPass.services");

router.post("/forgotPassword", async (req, res) => {
    try {
        const result = await forgotPassword(req.body.email);
        if (result.success) {
            res.status(200).json({ success: true, message: result.message });
        } else {
            res.status(400).json({ success: false, message: result.message });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;
