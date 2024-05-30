const ServicesType = require("../../models/serviceType.model");

async function updateServicesType(id, name) {
    try {
        if (!name) {
            throw new Error("Name is required");
        }

        const servicesType = await ServicesType.findByPk(id);

        if (!servicesType) {
            throw new Error("Services type not found");
        }

        await servicesType.update({
            Name: name,
        });

        return servicesType;
    } catch (error) {
        return res
            .status(500)
            .json({ message: "update failed: " + error.message });
    }
}

module.exports = {
    updateServicesType,
};
