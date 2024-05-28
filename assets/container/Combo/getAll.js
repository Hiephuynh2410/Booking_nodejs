const express = require("express");
const router = express.Router();
const MyAuthorize = require("../../../JwtToken/MyAuthorized");
const {
    GetAllCombo,
} = require("../../../Services/ComboServices/getAll.services");
router.use(MyAuthorize);

router.get("/", async (req, res) => {
    try {
        const combo = await GetAllCombo(req, res);
        res.json(combo);
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
