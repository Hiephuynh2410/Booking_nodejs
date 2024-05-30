const express = require("express");
const router = express.Router();
const MyAuthorized = require("../../../JwtToken/MyAuthorized");
const {
    updateServicesType,
} = require("../../../Services/ServicesTypeServices/update.services");

router.use(MyAuthorized);

// //update
router.put("/update/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { Name } = req.body;

        const updatedServicesType = await updateServicesType(id, Name);

        res.status(200).json(updatedServicesType);
    } catch (error) {
        console.error(error);
        if (
            error.message === "Name is required" ||
            error.message === "Services type not found"
        ) {
            return res.status(400).json({ message: error.message });
        }
        res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = router;
