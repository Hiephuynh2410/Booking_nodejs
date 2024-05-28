const Client = require("../../models/client.model");

const bcrypt = require("bcrypt");
const ValidateHelper = require("../../ValidateError/ValidateHelper");

async function registerClient(data, res) {
    try {
        const { Name, Username, Password, Phone, Address, Email } = data;

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
        const status = true;
        const role_id = 3;
        const newClient = await Client.create({
            Name,
            Username,
            Password: hashedPassword,
            Phone,
            Address,
            Email,
            Status: status,
            Created_at: createdAt,
            Role_id: role_id,
        });
        return res
            .status(201)
            .json({ message: "Registration successful", clients: newClient });
    } catch (error) {
        return res
            .status(500)
            .json({ message: "Registration failed: " + error.message });
    }
}

module.exports = {
    registerClient,
};
