const Combo = require("../../models/combo.model");

async function restoreCombo(id, res) {
    try {
        const combo = await Combo.findByPk(id);
        if (!combo) {
            throw new Error("combo not found");
        }
        combo.IsDeleted = true;
        await combo.save();
        return { success: true, message: "combo restore successfully" };
    } catch (error) {
        return res
            .status(500)
            .json({ message: "restore failed: " + error.message });
    }
}
module.exports = {
    restoreCombo,
};
