const express = require("express");
const router = express.Router();
const MyAuthorized = require("../../../JwtToken/MyAuthorized");

const {
  getAllDisabledStaff,
  registerStaff,
  loginStaff,
  changeStaffPassword,
  deleteStaff,
} = require("../../../Services/Staff.services");

// Get all Staff with IsDisabled = true
router.get("/", async (req, res) => {
  try {
    const staffs = await getAllDisabledStaff();
    res.json(staffs);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

//register
router.post("/register", async (req, res) => {
  try {
    const newStaff = await registerStaff(req.body, res);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { Username, Password } = req.body;
    const loginResult = await loginStaff(Username, Password);
    if (loginResult.success) {
      res.json(loginResult);
    } else {
      res.status(400).json(loginResult);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

//change password
router.put("/changePassword/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { Password } = req.body;

    const result = await changeStaffPassword(id, Password);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

//delete staff
router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await deleteStaff(id);
    console.log(result);
    res.json(result);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
