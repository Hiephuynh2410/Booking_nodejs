const express = require("express");
const router = express.Router();
const MyAuthorize = require("../../../JwtToken/MyAuthorized");
const { deleteCombo } = require("../../../Services/Combo.services");
router.use(MyAuthorize);

router.delete("/delete/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const result = await deleteCombo(id);
        console.log(result);
        res.json(result);
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
