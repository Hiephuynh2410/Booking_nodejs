const ServicesType = require("../../models/serviceType.model");

async function getAllServicesType(req, res) {
    try {
        const servicesType = await ServicesType.findAll({
            where: {
                IsDeleted: true,
            },
            attributes: {
                exclude: ["IsDeleted"],
            },
        });
        return servicesType;
    } catch (error) {
        return res
            .status(500)
            .json({ message: "get all failed: " + error.message });
    }
}

module.exports = {
    getAllServicesType,
};
