const express = require("express");
const router = express.Router();
const MyAuthorized = require("../../../JwtToken/MyAuthorized");
const {
    updateServices,
} = require("../../../Services/ServicesService/update.services");

router.use(MyAuthorized);

// //update
router.put("/update/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { Name, Price, UpdateAt } = req.body;

        const updatedServices = await updateServices(id, Name, Price, UpdateAt);

        res.status(200).json(updatedServices);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
