const Services = require("../../models/services.model");

async function createService(name, price, serviceTypeId) {
    try {
        if (!name || !price || !serviceTypeId) {
            throw new Error("Missing required fields");
        }
        const createdAt = new Date();

        const newService = await Services.create({
            Name: name,
            Price: price,
            Service_type_id: serviceTypeId,
            Created_at: createdAt,
            IsDeleted: true,
        });
        return newService;
    } catch (error) {
        return res
            .status(500)
            .json({ message: "create services failed: " + error.message });
    }
}

module.exports = {
    createService,
};
