const express = require("express");
const router = express.Router();
const MyAuthorized = require("../../../JwtToken/MyAuthorized");

const { deleteStaff } = require("../../../Services/Staff.services");

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
module.exports = router;
