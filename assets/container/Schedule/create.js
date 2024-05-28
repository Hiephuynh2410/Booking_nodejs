const express = require("express");
const router = express.Router();
const MyAuthorize = require("../../../JwtToken/MyAuthorized");
const { createSchedule } = require("../../../Services/Schedule.services");

router.use(MyAuthorize);

router.post("/create", async (req, res) => {
    try {
        const newSchedule = await createSchedule(req.body, res);
        return json(newSchedule);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
