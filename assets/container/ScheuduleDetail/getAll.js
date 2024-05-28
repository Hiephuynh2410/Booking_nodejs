const express = require("express");
const router = express.Router();
const MyAuthorize = require("../../../JwtToken/MyAuthorized");
const {
    getAllScheduleDetail,
} = require("../../../Services/scheduleDetail.services");

router.use(MyAuthorize);
router.get("/", async (req, res) => {
    try {
        const allScheduleDetails = await getAllScheduleDetail();
        res.status(200).json(allScheduleDetails);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
