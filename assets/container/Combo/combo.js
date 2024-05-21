const express = require("express");
const router = express.Router();
const MyAuthorize = require("../../../JwtToken/MyAuthorized");
const {
  GetAllCombo,
  createCombo,
  updateCombo,
  deleteCombo,
  restoreCombo,
} = require("../../../Services/Combo.services");
router.use(MyAuthorize);

router.get("/", async (req, res) => {
  try {
    const combo = await GetAllCombo(req, res);
    res.json(combo);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

router.post("/create", async (req, res) => {
  try {
    const newCombo = await createCombo(req.body, res);
    return json(newCombo);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

router.put("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    await updateCombo(id, updateData, res);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await deleteCombo(id);
    console.log(result);
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

router.patch("/restore/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await restoreCombo(id);
    console.log(result);
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});
module.exports = router;
