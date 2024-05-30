const express = require("express");
const router = express.Router();
const MyAuthorized = require("../../../JwtToken/MyAuthorized");
const {
    deleteServicesType,
} = require("../../../Services/ServicesTypeServices/delete.services");

router.use(MyAuthorized);

// //deleted
router.delete("/delete/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const result = await deleteServicesType(id);
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = router;
