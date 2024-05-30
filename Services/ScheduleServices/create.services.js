const Schedule = require("../../models/schedule.model");
const moment = require("moment");

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

module.exports = {
    createSchedule,
};
