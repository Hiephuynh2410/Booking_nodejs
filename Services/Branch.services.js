const Branch = require("../models/branch.model");

async function GetAllBranch(res) {
    try {
        const branches = await Branch.findAll({
            where: {
                IsDeleted: true,
            },
            attributes: { exclude: ["IsDeleted"] },
        });
        return branches;
    } catch (error) {
        return res
            .status(500)
            .json({ message: "get all failed: " + error.message });
    }
}

async function createbranch(data, res) {
    try {
        const { Address, Hotline } = data;
        if (!Address || !Hotline) {
            throw new Error("Address and hotline is requied");
        }
        const newBranch = await Branch.create({
            Address,
            Hotline,
            IsDeleted: true,
        });
        return res
            .status(201)
            .json({ message: "create successful", branch: newBranch });
    } catch (error) {
        return res
            .status(500)
            .json({ message: "get all failed: " + error.message });
    }
}

async function updateBranch(id, updateData) {
    try {
        const branch = await Branch.findByPk(id);
        if (!branch) {
            throw new Error("branch not found");
        }

        const updatedBranch = await branch.update(updateData);
        return updatedBranch;
    } catch (error) {
        throw new Error("Update failed: " + error.message);
    }
}

async function deletebranch(id, res) {
    try {
        const brnach = await Branch.findByPk(id);

        if (!brnach) {
            throw new Error("brnach not found");
        }

        brnach.IsDeleted = false;

        await brnach.save();

        return { success: true, message: "brnach deleted successfully" };
    } catch (error) {
        return res
            .status(500)
            .json({ message: "delete failed: " + error.message });
    }
}

async function restorebranch(id, res) {
    try {
        const brnach = await Branch.findByPk(id);

        if (!brnach) {
            throw new Error("brnach not found");
        }

        brnach.IsDeleted = true;

        await brnach.save();

        return { success: true, message: "brnach restore successfully" };
    } catch (error) {
        return res
            .status(500)
            .json({ message: "delete failed: " + error.message });
    }
}

module.exports = {
    GetAllBranch,
    createbranch,
    deletebranch,
    restorebranch,
    updateBranch,
};
