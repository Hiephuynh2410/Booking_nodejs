const Client = require("../../models/client.model");

const bcrypt = require("bcrypt");

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

module.exports = {
    changePass,
};
