const Branch = require("../../models/branch.model");

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

module.exports = {
    GetAllBranch,
};
