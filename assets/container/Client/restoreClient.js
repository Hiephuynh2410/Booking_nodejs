const express = require("express");
const router = express.Router();
const MyAuthorized = require("../../../JwtToken/MyAuthorized");

const {
    restoreClient,
} = require("../../../Services/ClientServices/restore.services");

router.use(MyAuthorized);

router.patch("/restore/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const result = await restoreClient(id);
        console.log(result);
        res.json(result);
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
