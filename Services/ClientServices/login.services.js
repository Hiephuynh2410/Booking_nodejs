const Client = require("../../models/client.model");

const bcrypt = require("bcrypt");
const generateToken = require("../../JwtToken/TokenGenerator");

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
module.exports = {
    loginClient,
};
