const Provider = require("../../models/provider.model");

async function GetallProvider(res) {
    try {
        const providers = await Provider.findAll({
            where: {
                IsDeleted: true,
            },
            attributes: { exclude: ["IsDeleted"] },
        });
        return providers;
    } catch (error) {
        return res
            .status(500)
            .json({ message: "get all failed: " + error.message });
    }
}

module.exports = {
    GetallProvider,
};
