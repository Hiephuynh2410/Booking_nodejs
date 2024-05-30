const ScheduleDetail = require("../../models/scheduleDetail.model");
const Staff = require("../../models/staff.model");
const Schedule = require("../../models/schedule.model");
async function getAllScheduleDetail() {
    try {
        const allScheduleDetails = await ScheduleDetail.findAll({
            where: { Status: true },
            include: [
                { model: Staff, attributes: ["Staff_id", "Name"] },
                { model: Schedule, attributes: ["Schedule_id", "Time"] },
            ],
        });
        return allScheduleDetails;
    } catch (error) {
        console.error("Error getting all ScheduleDetail:", error);
        throw new Error("Error getting all ScheduleDetail");
    }
}

module.exports = {
    getAllScheduleDetail,
};
