const Combo = require("../../models/combo.model");

async function GetAllCombo(res) {
    try {
        const combos = await Combo.findAll({
            where: {
                IsDeleted: true,
            },
            attributes: { exclude: ["IsDelered"] },
        });
        return combos;
    } catch (error) {
        return res
            .status(500)
            .json({ message: "get all failed: " + error.message });
    }
}
module.exports = {
    GetAllCombo,
};
