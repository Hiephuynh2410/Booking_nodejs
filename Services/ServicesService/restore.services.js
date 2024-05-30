const Services = require("../../models/services.model");

async function restoreServices(id) {
    try {
        const services = await Services.findByPk(id);

        if (!services) {
            throw new Error("Services not found");
        }

        services.IsDeleted = true;

        await services.save();

        return {
            success: true,
            message: `Services ${id} restore successfully`,
        };
    } catch (error) {
        return res
            .status(500)
            .json({ message: "update failed: " + error.message });
    }
}

module.exports = {
    restoreServices,
};
