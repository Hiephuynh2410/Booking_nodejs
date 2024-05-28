const Client = require("../../models/client.model");
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

module.exports = {
    deleteClient,
};
