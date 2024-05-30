const Staff = require("../../models/staff.model");
const {
    generateToken,
    generateResetToken,
} = require("../../JwtToken/TokenGenerator");
var sendmail = require("../../Sendmail/sendMail");
var config = require("../../config/mailConfig");

async function forgotPassword(email) {
    try {
        const staff = await Staff.findOne({ where: { Email: email } });
        if (staff) {
            const token = generateToken({
                StaffId: staff.Staff_id,
                email: staff.Email,
            });

            const url = `https://${config.hostName}/api/v1/staff/changePassword/${token}`;
            const message = `Click the following URL to reset your password: ${url}`;
            await sendmail(message, staff.Email);
            console.log(staff.Email);
            return { success: true, message: "Password reset email sent" };
        } else {
            return { success: false, message: "Email does not exist" };
        }
    } catch (error) {
        throw error;
    }
}

module.exports = {
    forgotPassword,
};
