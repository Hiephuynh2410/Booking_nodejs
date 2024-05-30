const Schedule = require("../../models/schedule.model");

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

module.exports = {
    deleteSchedule,
};
