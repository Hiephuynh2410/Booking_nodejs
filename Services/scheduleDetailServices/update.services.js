const ScheduleDetail = require("../../models/scheduleDetail.model");

async function updateScheduleDetail(scheduleId, staffId, updatedData) {
    try {
        const { Date, Status } = updatedData;

        await ScheduleDetail.update(
            { Date, Status },
            {
                where: {
                    Schedule_id: scheduleId,
                    Staff_id: staffId,
                },
            }
        );
        return {
            message: "ScheduleDetail, Staff, and Schedule updated successfully",
        };
    } catch (error) {
        throw new Error("Error updating ScheduleDetail");
    }
}

module.exports = {
    updateScheduleDetail,
};
