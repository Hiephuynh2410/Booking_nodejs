const Staff = require("../../models/staff.model");
const Branch = require("../../models/branch.model");
const Role = require("../../models/role.model");

async function getAllDisabledStaff() {
    try {
        const staffs = await Staff.findAll({
            where: {
                IsDisabled: true,
            },
            include: [
                {
                    model: Branch,
                    attributes: ["Branch_id", "address", "hotline"],
                },
                {
                    model: Role,
                    attributes: ["Role_id", "name"],
                },
            ],
            attributes: {
                exclude: [
                    "Password",
                    "FailedLoginAttempts",
                    "LastFailedLoginAttempt",
                ],
            },
        });
        return staffs;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getAllDisabledStaff,
};
