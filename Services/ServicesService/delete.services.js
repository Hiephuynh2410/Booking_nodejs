const Services = require("../../models/services.model");
const ServicesType = require("../../models/serviceType.model");

async function deleteServices(id) {
    try {
        const services = await Services.findByPk(id);

        if (!services) {
            throw new Error("Services not found");
        }

        services.IsDeleted = false;

        await services.save();

        return {
            success: true,
            message: `Services ${id} deleted successfully`,
        };
    } catch (error) {
        return res
            .status(500)
            .json({ message: "update failed: " + error.message });
    }
}

module.exports = {
    deleteServices,
};
