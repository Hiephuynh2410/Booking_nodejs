const express = require("express");
const router = express.Router();
const MyAuthorize = require("../../../JwtToken/MyAuthorized");
const {
    updateScheduleDetail,
} = require("../../../Services/scheduleDetail.services");

router.use(MyAuthorize);

router.put("/update/:scheduleId/:staffid", async (req, res) => {
    const { staffid, scheduleId } = req.params;
    const { Date, Status } = req.body;

    try {
        const result = await updateScheduleDetail(scheduleId, staffid, {
            Date,
            Status,
        });

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
