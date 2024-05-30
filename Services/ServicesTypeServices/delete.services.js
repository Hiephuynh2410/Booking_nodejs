const ServicesType = require("../../models/serviceType.model");

async function deleteServicesType(ServiceTypeid) {
    try {
        const servicesType = await ServicesType.findByPk(ServiceTypeid);

        if (!servicesType) {
            throw new Error("ServicesType not found");
        }

        servicesType.IsDeleted = false;

        await servicesType.save();

        return {
            success: true,
            message: `ServicesType ${ServiceTypeid} deleted successfully`,
        };
    } catch (error) {
        return res
            .status(500)
            .json({ message: "update failed: " + error.message });
    }
}

module.exports = {
    deleteServicesType,
};
