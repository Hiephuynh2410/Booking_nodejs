const Branch = require("../../models/branch.model");

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

module.exports = {
    createbranch,
};
