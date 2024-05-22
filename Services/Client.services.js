const Role = require("../models/role.model");
const Client = require("../models/client.model");

const bcrypt = require("bcrypt");
const generateToken = require("../JwtToken/TokenGenerator");
const ValidateHelper = require("../ValidateError/ValidateHelper");

async function getAllClient() {
    try {
        const clients = await Client.findAll({
            where: {
                Status: true,
            },
            include: [
                {
                    model: Role,
                    attributes: ["Role_id", "name"],
                },
            ],
            attributes: {
                exclude: ["Password"],
            },
        });
        return clients;
    } catch (error) {
        throw error;
    }
}

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

async function loginClient(username, password) {
    try {
        const client = await Client.findOne({ where: { Username: username } });
        if (!client) {
            return {
                success: false,
                message: "Wrong username, please try again!",
            };
        }

        const passwordMatch = await bcrypt.compare(password, client.Password);
        if (!passwordMatch) {
            return {
                success: false,
                message: "Wrong password, please try again!",
            };
        }

        const token = generateToken({
            Username: username,
            ClientId: client.Client_id,
        });
        return { success: true, message: "Login successful", token };
    } catch (error) {
        throw error;
    }
}

async function changePass(id, newPassword) {
    try {
        if (!newPassword) {
            throw new Error("New password is required");
        }

        const client = await Client.findByPk(id);
        if (!client) {
            throw new Error("client not found");
        }

        const hashedNewPassword = await bcrypt.hash(newPassword, 10);

        await client.update({ Password: hashedNewPassword });

        return { success: true, message: "Password changed successfully" };
    } catch (error) {
        throw error;
    }
}

async function deleteClient(Id, res) {
    try {
        const client = await Client.findByPk(Id);

        if (!client) {
            throw new Error("client not found");
        }

        client.Status = false;

        await client.save();

        return { success: true, message: "Client deleted successfully" };
    } catch (error) {
        return res
            .status(500)
            .json({ message: "delete failed: " + error.message });
    }
}

async function restoreClient(Id, res) {
    try {
        const client = await Client.findByPk(Id);

        if (!client) {
            throw new Error("client not found");
        }

        client.Status = true;

        await client.save();

        return { success: true, message: "Client restore successfully" };
    } catch (error) {
        return res
            .status(500)
            .json({ message: "delete failed: " + error.message });
    }
}
module.exports = {
    getAllClient,
    registerClient,
    loginClient,
    changePass,
    deleteClient,
    restoreClient,
};
