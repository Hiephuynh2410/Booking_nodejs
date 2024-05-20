const Provider = require("../models/provider.model");

async function GetallProvider(res) {
  try {
    const providers = await Provider.findAll({
      where: {
        IsDeleted: true,
      },
      attributes: { exclude: ["IsDeleted"] },
    });
    return providers;
  } catch (error) {
    return res
      .status(500)
      .json({ message: "get all failed: " + error.message });
  }
}

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

async function deleteProvider(id) {
  try {
    const provider = await Provider.findByPk(id);

    if (!provider) {
      throw new Error("provider not found");
    }

    provider.IsDeleted = false;

    await provider.save();

    return {
      success: true,
      message: `Provider ${id} deleted successfully`,
    };
  } catch (error) {
    return res.status(500).json({ message: "delete failed: " + error.message });
  }
}

async function restoreProvider(id) {
  try {
    const provider = await Provider.findByPk(id);

    if (!provider) {
      throw new Error("provider not found");
    }

    provider.IsDeleted = true;

    await provider.save();

    return {
      success: true,
      message: `Provider ${id} restore successfully`,
    };
  } catch (error) {
    return res
      .status(500)
      .json({ message: "restore failed: " + error.message });
  }
}

module.exports = {
  GetallProvider,
  createProvider,
  updateProvider,
  deleteProvider,
  restoreProvider,
};
