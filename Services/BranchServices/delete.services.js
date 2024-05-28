const Branch = require("../../models/branch.model");

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

module.exports = {
    deletebranch,
};
