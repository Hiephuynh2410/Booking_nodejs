const express = require("express");
const router = express.Router();
const MyAuthorize = require("../../../JwtToken/MyAuthorized");
const {
    getAllSchedule,
} = require("../../../Services/ScheduleServices/getAll.services");

router.use(MyAuthorize);
router.get("/", async (req, res) => {
    try {
        const schedule = await getAllSchedule(req, res);
        res.json(schedule);
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
