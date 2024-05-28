const Branch = require("../../models/branch.model");

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

module.exports = {
    updateBranch,
};
