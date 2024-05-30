const Staff = require("../../models/staff.model");
const bcrypt = require("bcrypt");
const {
    generateToken,
    generateResetToken,
} = require("../../JwtToken/TokenGenerator");

async function loginStaff(username, password) {
    try {
        const staff = await Staff.findOne({ where: { Username: username } });
        if (!staff) {
            return {
                success: false,
                message: "Wrong username, please try again!",
            };
        }

        const passwordMatch = await bcrypt.compare(password, staff.Password);
        if (!passwordMatch) {
            return {
                success: false,
                message: "Wrong password, please try again!",
            };
        }

        const token = generateToken({
            Username: username,
            StaffId: staff.Staff_id,
        });
        return { success: true, message: "Login successful", token };
    } catch (error) {
        throw error;
    }
}

module.exports = {
    loginStaff,
};
