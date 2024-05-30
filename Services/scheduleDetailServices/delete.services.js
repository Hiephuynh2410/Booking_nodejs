const ScheduleDetail = require("../../models/scheduleDetail.model");

async function deleteScheduleDetail(scheduleId, staffId) {
    try {
        const [affectedRows] = await ScheduleDetail.update(
            { Status: false },
            {
                where: {
                    Schedule_id: scheduleId,
                    Staff_id: staffId,
                },
            }
        );

        if (affectedRows > 0) {
            return {
                message: "ScheduleDetail deleted successfully",
            };
        } else {
            throw new Error("No ScheduleDetail found to delete");
        }
    } catch (error) {
        console.error("Error deleting ScheduleDetail:", error);
        throw new Error("Error deleting ScheduleDetail");
    }
}

module.exports = {
    deleteScheduleDetail,
};
