const Provider = require("../../models/provider.model");

async function deleteProvider(id) {
    try {
        const provider = await Provider.findByPk(id);

        if (!provider) {
            throw new Error("provider not found");
        }

        provider.IsDeleted = false;

        await provider.save();

        return {
            success: true,
            message: `Provider ${id} deleted successfully`,
        };
    } catch (error) {
        return res
            .status(500)
            .json({ message: "delete failed: " + error.message });
    }
}

module.exports = {
    deleteProvider,
};
