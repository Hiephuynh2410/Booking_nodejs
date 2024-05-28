const express = require("express");
const router = express.Router();
const MyAuthorize = require("../../../JwtToken/MyAuthorized");
const {
    createScheduleDetail,
} = require("../../../Services/scheduleDetail.services");

router.use(MyAuthorize);
router.post("/create", async (req, res) => {
    const { Schedule_id, Staff_id, Date, Status } = req.body;

    try {
        const newScheduleDetail = await createScheduleDetail({
            Schedule_id,
            Staff_id,
            Date,
            Status,
        });
        res.status(201).json(newScheduleDetail);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
