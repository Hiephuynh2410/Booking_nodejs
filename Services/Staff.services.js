const Staff = require("../models/staff.model");
const Branch = require("../models/branch.model");
const Role = require("../models/role.model");
const bcrypt = require("bcrypt");
const generateToken = require("../JwtToken/TokenGenerator");
const ValidateHelper = require("../ValidateError/ValidateHelper");

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

async function registerStaff(data, res) {
    try {
        const {
            Name,
            Username,
            Password,
            Phone,
            Address,
            Email,
            Role_id,
            Branch_id,
        } = data;

        const isUnique = await ValidateHelper.isUsernameUnique(Username);
        if (!isUnique) {
            throw new Error("Username already exists");
        }

        const isValidPassword = await ValidateHelper.RegexPassword(Password);
        if (!isValidPassword) {
            throw new Error(
                "Password must contain at least one uppercase letter, one lowercase letter, one digit, and be between 8 and 32 characters long"
            );
        }
        const hashedPassword = await bcrypt.hash(Password, 10);
        const createdAt = new Date();
        const IsDisabled = true;

        const newStaff = await Staff.create({
            Name,
            Username,
            Password: hashedPassword,
            Phone,
            Address,
            Email,
            IsDisabled,
            Created_at: createdAt,
            Role_id,
            Branch_id,
        });
        return res
            .status(201)
            .json({ message: "Registration successful", staff: newStaff });
    } catch (error) {
        return res
            .status(500)
            .json({ message: "Registration failed: " + error.message });
    }
}

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

async function changeStaffPassword(id, newPassword) {
    try {
        if (!newPassword) {
            throw new Error("New password is required");
        }

        const staff = await Staff.findByPk(id);
        if (!staff) {
            throw new Error("Staff not found");
        }

        const hashedNewPassword = await bcrypt.hash(newPassword, 10);

        await staff.update({ Password: hashedNewPassword });

        return { success: true, message: "Password changed successfully" };
    } catch (error) {
        throw error;
    }
}

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

async function restoreStaff(staffId, res) {
    try {
        const staff = await Staff.findByPk(staffId);

        if (!staff) {
            throw new Error("Staff not found");
        }

        staff.IsDisabled = true;

        await staff.save();

        return { success: true, message: "Staff restore successfully" };
    } catch (error) {
        return res
            .status(500)
            .json({ message: "delete failed: " + error.message });
    }
}

module.exports = {
    getAllDisabledStaff,
    registerStaff,
    loginStaff,
    changeStaffPassword,
    deleteStaff,
    restoreStaff,
};
