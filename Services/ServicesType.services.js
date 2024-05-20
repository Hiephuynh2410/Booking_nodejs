const ServicesType = require("../models/serviceType.model");

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
    return res.status(500).json({ message: "create failed: " + error.message });
  }
}

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
    return res.status(500).json({ message: "update failed: " + error.message });
  }
}

async function deleteServicesType(ServiceTypeid) {
  try {
    const servicesType = await ServicesType.findByPk(ServiceTypeid);

    if (!servicesType) {
      throw new Error("ServicesType not found");
    }

    servicesType.IsDeleted = false;

    await servicesType.save();

    return {
      success: true,
      message: `ServicesType ${ServiceTypeid} deleted successfully`,
    };
  } catch (error) {
    return res.status(500).json({ message: "update failed: " + error.message });
  }
}

async function restoreServicesType(ServiceTypeid) {
  try {
    const servicesType = await ServicesType.findByPk(ServiceTypeid);

    if (!servicesType) {
      throw new Error("ServicesType not found");
    }

    servicesType.IsDeleted = true;

    await servicesType.save();

    return {
      success: true,
      message: `ServicesType ${ServiceTypeid} restore successfully`,
    };
  } catch (error) {
    return res.status(500).json({ message: "update failed: " + error.message });
  }
}

module.exports = {
  getAllServicesType,
  createServicesType,
  updateServicesType,
  deleteServicesType,
  restoreServicesType,
};
