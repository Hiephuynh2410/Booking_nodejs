const express = require("express");
const router = express.Router();
const Branch = require("../../../models/branch.model");

//get all
router.get("/", async (req, res) => {
  try {
    const branches = await Branch.findAll({
      where: {
        IsDeleted: true,
      },
      attributes: { exclude: ["IsDeleted"] },
    });
    res.json(branches);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

//create
router.post("/create", async (req, res) => {
  try {
    const { Address, Hotline } = req.body;

    if (!Hotline || !Address) {
      return res
        .status(400)
        .json({ message: "Please provide all necessary information" });
    }

    const newBranch = await Branch.create({
      Hotline,
      Address,
      IsDeleted: true,
    });

    res.status(201).json(newBranch);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

//update
router.put("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { Address, Hotline } = req.body;

    if (!Address || !Hotline) {
      return res.status(400).json({ message: "Address, Hotline are required" });
    }

    const branch = await Branch.findByPk(id);

    if (!branch) {
      return res.status(404).json({ message: "branch not found" });
    }

    await branch.update({
      Address,
      Hotline,
    });

    res.json({ message: "update success", branch });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

//delete
router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const branch = await Branch.findByPk(id);
    if (!branch) {
      return res.status(404).json({ message: "branch not found" });
    }

    branch.IsDeleted = false;
    await branch.save();
    res.json({ message: `branch ${id} deleted successfully` });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

//restore
router.patch("/restore/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const branch = await Branch.findByPk(id);
    if (!branch) {
      return res.status(404).json({ message: "branch not found" });
    }

    branch.IsDeleted = true;
    await branch.save();

    res.json({ message: `branch ${id} restored successfully` });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});
module.exports = router;
