const express = require("express");
const router = express.Router();
const Staff = require("../../../models/staff.model");
const Branch = require("../../../models/branch.model");
const Role = require("../../../models/role.model");
const bcrypt = require("bcrypt");

// get all Staff
router.get("/", async (req, res) => {
  try {
    const staffs = await Staff.findAll({
      include: [
        {
          model: Branch,
          attributes: ["Branch_id", "address", "hotline"],
        },
        {
          model: Role,
          attributes: ["Role_id", "name"],
        },
      ],
      attributes: {
        exclude: ["Password", "FailedLoginAttempts", "LastFailedLoginAttempt"],
      },
    });
    res.json(staffs);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/register", async (req, res) => {
  try {
    const {
      Name,
      Username,
      Password,
      Phone,
      Address,
      Email,
      IsDisabled,
      Role_id,
      Branch_id,
    } = req.body;

    const hashedPassword = await bcrypt.hash(Password, 10);

    const createdAt = new Date();

    const newStaff = await Staff.create({
      Name,
      Username,
      Password: hashedPassword,
      Phone,
      Address,
      Email,
      IsDisabled,
      Created_at: createdAt,
      Role_id,
      Branch_id,
    });

    res
      .status(201)
      .json({ message: "Registration successful", staff: newStaff });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
