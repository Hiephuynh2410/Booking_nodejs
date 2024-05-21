const express = require("express");
const router = express.Router();
const MyAuthorize = require("../../../JwtToken/MyAuthorized");
const {
    createScheduleDetail,
    getAllScheduleDetail,
    updateScheduleDetail,
    deleteScheduleDetail,
    restoreScheduleDetail,
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

router.get("/", async (req, res) => {
    try {
        const allScheduleDetails = await getAllScheduleDetail();
        res.status(200).json(allScheduleDetails);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

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

router.delete("/delete/:staffId/:scheduleId", async (req, res) => {
    const { staffId, scheduleId } = req.params;

    try {
        const result = await deleteScheduleDetail(scheduleId, staffId);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete("/restore/:staffId/:scheduleId", async (req, res) => {
    const { staffId, scheduleId } = req.params;

    try {
        const result = await restoreScheduleDetail(scheduleId, staffId);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
module.exports = router;
