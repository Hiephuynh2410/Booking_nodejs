const ScheduleDetail = require("../models/scheduleDetail.model");
const Staff = require("../models/staff.model");
const Schedule = require("../models/schedule.model");
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

async function restoreScheduleDetail() {}
module.exports = {
    createScheduleDetail,
    getAllScheduleDetail,
    updateScheduleDetail,
    deleteScheduleDetail,
    restoreScheduleDetail,
};
