const Schedule = require("../../models/schedule.model");

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
    restoreSchedule,
};
