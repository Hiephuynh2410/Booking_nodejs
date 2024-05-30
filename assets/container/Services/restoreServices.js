const express = require("express");
const router = express.Router();
const MyAuthorized = require("../../../JwtToken/MyAuthorized");
const {
    restoreServices,
} = require("../../../Services/ServicesService/restore.services");

router.use(MyAuthorized);

router.patch("/restore/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const result = await restoreServices(id);
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
module.exports = router;
