const express = require("express");
const router = express.Router();
const MyAuthorized = require("../../../JwtToken/MyAuthorized");

const {
    deleteClient,
} = require("../../../Services/ClientServices/delete.services");

router.use(MyAuthorized);

router.delete("/delete/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const result = await deleteClient(id);
        console.log(result);
        res.json(result);
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
