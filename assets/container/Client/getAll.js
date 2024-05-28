const express = require("express");
const router = express.Router();
const MyAuthorized = require("../../../JwtToken/MyAuthorized");

const {
    getAllClient,
} = require("../../../Services/ClientServices/getAll.services");

router.use(MyAuthorized);

router.get("/", async (req, res) => {
    try {
        const clients = await getAllClient();
        res.json(clients);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
