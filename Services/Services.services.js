const Services = require("../models/services.model");
const ServicesType = require("../models/serviceType.model");

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
    GetAllServices,
    createService,
    updateServices,
    deleteServices,
    restoreServices,
};
