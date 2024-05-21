const Combo = require("../models/combo.model");

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
    GetAllCombo,
    createCombo,
    updateCombo,
    deleteCombo,
    restoreCombo,
};
