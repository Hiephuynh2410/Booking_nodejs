const Provider = require("../../models/provider.model");

async function restoreProvider(id) {
    try {
        const provider = await Provider.findByPk(id);

        if (!provider) {
            throw new Error("provider not found");
        }

        provider.IsDeleted = true;

        await provider.save();

        return {
            success: true,
            message: `Provider ${id} restore successfully`,
        };
    } catch (error) {
        return res
            .status(500)
            .json({ message: "restore failed: " + error.message });
    }
}

module.exports = {
    restoreProvider,
};
