const ScheduleDetail = require("../../models/scheduleDetail.model");

async function restoreScheduleDetail(scheduleId, staffId) {
    try {
        const [affectedRows] = await ScheduleDetail.update(
            { Status: true },
            {
                where: {
                    Schedule_id: scheduleId,
                    Staff_id: staffId,
                },
            }
        );

        if (affectedRows > 0) {
            return {
                message: "ScheduleDetail restored successfully",
            };
        } else {
            throw new Error("No ScheduleDetail found to restore");
        }
    } catch (error) {
        console.error("Error restoring ScheduleDetail:", error);
        throw new Error("Error restoring ScheduleDetail");
    }
}

module.exports = {
    restoreScheduleDetail,
};
