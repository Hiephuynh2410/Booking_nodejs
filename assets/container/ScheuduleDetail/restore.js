const express = require("express");
const router = express.Router();
const MyAuthorize = require("../../../JwtToken/MyAuthorized");
const {
    restoreScheduleDetail,
} = require("../../../Services/scheduleDetailServices/restore.services");

router.use(MyAuthorize);

router.patch("/restore/:staffId/:scheduleId", async (req, res) => {
    const { staffId, scheduleId } = req.params;

    try {
        const result = await restoreScheduleDetail(scheduleId, staffId);
        res.status(200).json(result);
        2;
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
