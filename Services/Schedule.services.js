const Schedule = require("../models/schedule.model");
const moment = require("moment");
async function getAllSchedule(res) {
    try {
        const schedule = await Schedule.findAll({
            where: {
                IsDeleted: true,
            },
            attributes: { exclude: ["IsDeleted"] },
        });
        return schedule;
    } catch (error) {
        return res
            .status(500)
            .json({ message: "get all failed: " + error.message });
    }
}

async function createSchedule(data, res) {
    try {
        const schedules = [];
        const startTime = moment("08:00", "HH:mm");
        const endTime = moment("21:00", "HH:mm");

        while (startTime.isBefore(endTime)) {
            const timeSlot = startTime.format("HH:mm");
            const newSchedule = await Schedule.create({
                Time: timeSlot,
                IsDeleted: true,
            });
            schedules.push(newSchedule);
            startTime.add(30, "minutes");
        }

        return res
            .status(201)
            .json({ message: "Create successful", schedules });
    } catch (error) {
        return res
            .status(500)
            .json({ message: "Create failed: " + error.message });
    }
}

async function deleteSchedule(id, res) {
    try {
        const schedule = await Schedule.findByPk(id);

        if (!schedule) {
            throw new Error("schedule not found");
        }

        schedule.IsDeleted = false;

        await schedule.save();

        return { success: true, message: "schedule deleted successfully" };
    } catch (error) {
        return res
            .status(500)
            .json({ message: "delete failed: " + error.message });
    }
}

async function restoreSchedule(id, res) {
    try {
        const schedule = await Schedule.findByPk(id);

        if (!schedule) {
            throw new Error("schedule not found");
        }

        schedule.IsDeleted = true;

        await schedule.save();

        return { success: true, message: "schedule restore successfully" };
    } catch (error) {
        return res
            .status(500)
            .json({ message: "delete failed: " + error.message });
    }
}
module.exports = {
    getAllSchedule,
    createSchedule,
    deleteSchedule,
    restoreSchedule,
};
