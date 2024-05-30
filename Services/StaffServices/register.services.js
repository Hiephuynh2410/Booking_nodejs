const Staff = require("../../models/staff.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
    generateToken,
    generateResetToken,
} = require("../../JwtToken/TokenGenerator");
const ValidateHelper = require("../../ValidateError/ValidateHelper");

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

module.exports = {
    registerStaff,
};
