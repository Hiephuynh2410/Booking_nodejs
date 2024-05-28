const Combo = require("../../models/combo.model");

async function deleteCombo(id, res) {
    try {
        const combo = await Combo.findByPk(id);
        if (!combo) {
            throw new Error("combo not found");
        }
        combo.IsDeleted = false;
        await combo.save();
        return { success: true, message: "combo deleted successfully" };
    } catch (error) {
        return res
            .status(500)
            .json({ message: "delete failed: " + error.message });
    }
}
module.exports = {
    deleteCombo,
};
