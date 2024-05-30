const ServicesType = require("../../models/serviceType.model");

async function restoreServicesType(ServiceTypeid) {
    try {
        const servicesType = await ServicesType.findByPk(ServiceTypeid);

        if (!servicesType) {
            throw new Error("ServicesType not found");
        }

        servicesType.IsDeleted = true;

        await servicesType.save();

        return {
            success: true,
            message: `ServicesType ${ServiceTypeid} restore successfully`,
        };
    } catch (error) {
        return res
            .status(500)
            .json({ message: "update failed: " + error.message });
    }
}

module.exports = {
    restoreServicesType,
};
