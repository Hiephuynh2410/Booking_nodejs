const ScheduleDetail = require("../../models/scheduleDetail.model");
async function createScheduleDetail(scheduleDetailData) {
    try {
        scheduleDetailData.Status = true;

        const newScheduleDetail =
            await ScheduleDetail.create(scheduleDetailData);
        return newScheduleDetail;
    } catch (error) {
        console.error("Error creating ScheduleDetail:", error);
        throw new Error("Error creating ScheduleDetail");
    }
}

module.exports = {
    createScheduleDetail,
};
