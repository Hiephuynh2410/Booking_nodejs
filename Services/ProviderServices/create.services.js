const Provider = require("../../models/provider.model");

async function createProvider(data, res) {
    try {
        const { Name, Address, Phone, Email } = data;
        const IsDeleted = true;
        const newProvider = await Provider.create({
            Name,
            Address,
            Phone,
            Email,
            IsDeleted,
        });
        return res
            .status(201)
            .json({ message: "create successful", provider: newProvider });
    } catch (error) {
        return res
            .status(500)
            .json({ message: "create provider failed: " + error.message });
    }
}
module.exports = {
    createProvider,
};
