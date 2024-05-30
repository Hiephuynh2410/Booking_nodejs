const ServicesType = require("../../models/serviceType.model");

async function createServicesType(Name) {
    try {
        if (!Name) {
            throw new Error("Missing required fields");
        }
        const newServicesType = await ServicesType.create({
            Name: Name,
            IsDeleted: true,
        });
        return newServicesType;
    } catch (error) {
        return res
            .status(500)
            .json({ message: "create failed: " + error.message });
    }
}

module.exports = {
    createServicesType,
};
