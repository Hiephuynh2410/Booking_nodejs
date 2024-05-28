const express = require("express");
const router = express.Router();
const MyAuthorize = require("../../../JwtToken/MyAuthorized");
const {
    deleteScheduleDetail,
} = require("../../../Services/scheduleDetail.services");

router.use(MyAuthorize);

router.delete("/delete/:staffId/:scheduleId", async (req, res) => {
    const { staffId, scheduleId } = req.params;

    try {
        const result = await deleteScheduleDetail(scheduleId, staffId);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
module.exports = router;
