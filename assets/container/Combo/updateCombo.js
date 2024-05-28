const express = require("express");
const router = express.Router();
const MyAuthorize = require("../../../JwtToken/MyAuthorized");
const { updateCombo } = require("../../../Services/Combo.services");
router.use(MyAuthorize);

router.put("/update/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        await updateCombo(id, updateData, res);
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
