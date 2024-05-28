const Combo = require("../../models/combo.model");

async function updateCombo(id, updateData, res) {
    try {
        const { Name, Price } = updateData;

        if (!Name || !Price) {
            throw new Error("Name and price are required");
        }

        const combo = await Combo.findByPk(id);

        if (!combo) {
            throw new Error("Combo not found");
        }

        await combo.update({
            Name,
            Price,
            Updated_at: new Date(),
        });

        return res.status(200).json({ message: "Update successful", combo });
    } catch (error) {
        console.error(error);
        return res
            .status(500)
            .json({ message: "Update failed: " + error.message });
    }
}
module.exports = {
    updateCombo,
};
