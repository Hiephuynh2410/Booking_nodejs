const express = require("express");
const router = express.Router();
const MyAuthorize = require("../../../JwtToken/MyAuthorized");
const {
    createCombo,
} = require("../../../Services/ComboServices/create.services");
router.use(MyAuthorize);

router.post("/create", async (req, res) => {
    try {
        const newCombo = await createCombo(req.body, res);
        return json(newCombo);
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
