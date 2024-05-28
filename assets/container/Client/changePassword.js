const express = require("express");
const router = express.Router();
const MyAuthorized = require("../../../JwtToken/MyAuthorized");

const {
    changePass,
} = require("../../../Services/ClientServices/changePassword.services");

router.use(MyAuthorized);

router.put("/changePassword/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { Password } = req.body;

        const result = await changePass(id, Password);
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
