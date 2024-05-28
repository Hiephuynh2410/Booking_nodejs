const Branch = require("../../models/branch.model");

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
    restorebranch,
};
