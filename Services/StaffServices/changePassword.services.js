const Staff = require("../../models/staff.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function changeStaffPassword(token, newPassword) {
    try {
        if (!newPassword) {
            throw new Error("New password is required");
        }

        const decoded = jwt.verify(token, process.env.SECRECT_KEY);
        const staffId = decoded.StaffId;

        const staff = await Staff.findByPk(staffId);
        if (!staff) {
            throw new Error("Staff not found");
        }

        const hashedNewPassword = await bcrypt.hash(newPassword, 10);
        await staff.update({ Password: hashedNewPassword });

        return { success: true, message: "Password changed successfully" };
    } catch (error) {
        throw new Error("Error changing password: " + error.message);
    }
}
module.exports = {
    changeStaffPassword,
};
