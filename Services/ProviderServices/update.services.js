const Provider = require("../../models/provider.model");

async function updateProvider(data, id) {
    try {
        const { Name, Address, Phone, Email } = data;

        if (!Name || !Address || !Phone || !Email) {
            throw new Error("Name, Address, Phone, and Email are required");
        }

        const provider = await Provider.findByPk(id);

        if (!provider) {
            throw new Error("Provider not found");
        }

        provider.Name = Name;
        provider.Address = Address;
        provider.Phone = Phone;
        provider.Email = Email;

        await provider.save();

        return provider;
    } catch (error) {
        return res
            .status(500)
            .json({ message: "update provider failed: " + error.message });
    }
}

module.exports = {
    updateProvider,
};
