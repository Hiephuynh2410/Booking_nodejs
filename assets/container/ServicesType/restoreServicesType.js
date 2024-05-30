const express = require("express");
const router = express.Router();
const MyAuthorized = require("../../../JwtToken/MyAuthorized");
const {
    restoreServicesType,
} = require("../../../Services/ServicesTypeServices/restore.services");

router.use(MyAuthorized);

// //restore
router.patch("/restore/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const result = await restoreServicesType(id);
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = router;
