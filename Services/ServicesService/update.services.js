const Services = require("../../models/services.model");

async function updateServices(id, name, price, Updated_at) {
    try {
        if (!name || !price) {
            throw new Error("Name & price is required");
        }
        const services = await Services.findByPk(id);

        if (!services) {
            throw new Error("Services not found");
        }
        await services.update({
            Name: name,
            Price: price,
            Updated_at: new Date(),
        });
        return services;
    } catch (error) {
        return res
            .status(500)
            .json({ message: `update services ${id} failed` + error.message });
    }
}

module.exports = {
    updateServices,
};
