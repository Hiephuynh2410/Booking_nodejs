const Staff = require("../../models/staff.model");

async function deleteStaff(staffId, res) {
    try {
        const staff = await Staff.findByPk(staffId);

        if (!staff) {
            throw new Error("Staff not found");
        }

        staff.IsDisabled = false;

        await staff.save();

        return { success: true, message: "Staff deleted successfully" };
    } catch (error) {
        return res
            .status(500)
            .json({ message: "delete failed: " + error.message });
    }
}

module.exports = {
    deleteStaff,
};
