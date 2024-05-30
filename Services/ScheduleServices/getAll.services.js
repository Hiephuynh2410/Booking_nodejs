const Schedule = require("../../models/schedule.model");
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

module.exports = {
    getAllSchedule,
};
