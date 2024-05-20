const express = require("express");
const router = express.Router();
const MyAuthorize = require("../../../JwtToken/MyAuthorized");
const {
  GetAllBranch,
  createbranch,
  deletebranch,
  restorebranch,
  updateBranch,
} = require("../../../Services/Branch.services");
const { json } = require("sequelize");

router.use(MyAuthorize);
//get all
router.get("/", async (req, res) => {
  try {
    const branch = await GetAllBranch(req, res);
    res.json(branch);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

// //create
router.post("/create", async (req, res) => {
  try {
    const newbrnach = await createbranch(req.body, res);
    return json(newbrnach);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// //update
router.put("/update/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updateData = req.body;
    const updatedBranch = await updateBranch(id, updateData);
    res.json(updatedBranch);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

//delete
router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await deletebranch(id);
    console.log(result);
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

// //restore
router.patch("/restore/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await restorebranch(id);
    console.log(result);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});
module.exports = router;
