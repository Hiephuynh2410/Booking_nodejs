const express = require("express");
const router = express.Router();
const generateToken = require("../../../JwtToken/TokenGenerator");
const Staff = require("../../../models/staff.model");
const MyAuthorized = require("../../../JwtToken/MyAuthorized");
const Branch = require("../../../models/branch.model");
const Role = require("../../../models/role.model");
const bcrypt = require("bcrypt");

// Get all Staff with IsDisabled = true
router.get("/", async (req, res) => {
  try {
    const staffs = await Staff.findAll({
      where: {
        IsDisabled: true,
      },
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

//register
router.post("/register", async (req, res) => {
  try {
    const {
      Name,
      Username,
      Password,
      Phone,
      Address,
      Email,
      Role_id,
      Branch_id,
    } = req.body;

    const hashedPassword = await bcrypt.hash(Password, 10);

    const createdAt = new Date();
    const IsDisabled = true; // if isDisable = true register success,  else delete

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

// Login
router.post("/login", async (req, res) => {
  try {
    const { Username, Password } = req.body;

    const staff = await Staff.findOne({ where: { Username } });
    if (!staff) {
      return res
        .status(400)
        .json({ message: "wrong username please try again!" });
    }

    const passwordMatch = await bcrypt.compare(Password, staff.Password);
    if (!passwordMatch) {
      return res.status(400).json({ message: "wrong pass please try again!" });
    }
    const token = generateToken({ Username, StaffId: staff.Staff_id });

    res.json({ message: "Login successful", token });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

//change Password for user
router.put("/changePassword", async (req, res) => {});
module.exports = router;
