const Services = require("../../models/services.model");
const ServicesType = require("../../models/serviceType.model");

async function GetAllServices(res) {
    try {
        const servcies = await Services.findAll({
            where: {
                IsDeleted: true,
            },
            include: [
                {
                    model: ServicesType,
                    attributes: ["Service_type_id", "Name"],
                },
            ],
        });
        return servcies;
    } catch (error) {
        return res
            .status(500)
            .json({ message: "get all failed: " + error.message });
    }
}

module.exports = {
    GetAllServices,
};
