const Role = require("../../models/role.model");
const Client = require("../../models/client.model");
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

module.exports = {
    getAllClient,
};
