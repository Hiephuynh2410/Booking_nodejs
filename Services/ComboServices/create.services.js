const Combo = require("../../models/combo.model");

async function createCombo(data, res) {
    try {
        const { Name, Price } = data;
        if (!Name || !Price) {
            throw new Error("Name and price is required");
        }
        const CreateAt = new Date();
        const IsDeleted = true;
        const newCombo = await Combo.create({
            Name,
            Price,
            Created_at: CreateAt,
            IsDeleted,
        });
        return res
            .status(200)
            .json({ message: "create successfully: ", combo: newCombo });
    } catch (error) {
        return res
            .status(500)
            .json({ message: "create failed: " + error.message });
    }
}
module.exports = {
    createCombo,
};
