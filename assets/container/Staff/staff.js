const express = require("express");
const router = express.Router();
const MyAuthorized = require("../../../JwtToken/MyAuthorized");

const {
    getAllDisabledStaff,
    registerStaff,
    loginStaff,
    changeStaffPassword,
    deleteStaff,
    restoreStaff,
    forgotPassword,
} = require("../../../Services/Staff.services");

router.get("/", MyAuthorized, async (req, res) => {
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

//delete staff
router.delete("/delete/:id", MyAuthorized, async (req, res) => {
    try {
        const { id } = req.params;

        const result = await deleteStaff(id);
        console.log(result);
        res.json(result);
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
});

//restore Staff
router.patch("/restore/:id", MyAuthorized, async (req, res) => {
    try {
        const { id } = req.params;
        const result = await restoreStaff(id);
        console.log(result);
        res.json(result);
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
});

//forgot password
router.post("/forgotPassword", async (req, res) => {
    try {
        const result = await forgotPassword(req.body.email);
        if (result.success) {
            res.status(200).json({ success: true, message: result.message });
        } else {
            res.status(400).json({ success: false, message: result.message });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

//change password
// router.put("/changePassword/:id", MyAuthorized, async (req, res) => {
//     try {
//         const { id } = req.params;
//         const { Password } = req.body;
//         const result = await changeStaffPassword(id, Password);
//         res.json(result);
//     } catch (error) {
//         console.error(error);
//         res.status(500).send("Internal Server Error");
//     }
// });
router.put("/changePassword/:token", async (req, res) => {
    try {
        const { token } = req.params;
        const { newPassword } = req.body; // Changed to newPassword for clarity

        const result = await changeStaffPassword(token, newPassword);
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
