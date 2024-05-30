const express = require("express");
const router = express.Router();
const MyAuthorized = require("../../../JwtToken/MyAuthorized");
const {
    createServicesType,
} = require("../../../Services/ServicesTypeServices/create.services");

router.use(MyAuthorized);

router.post("/create", async (req, res) => {
    try {
        const { Name } = req.body;
        const newServicesType = await createServicesType(Name);
        res.status(201).json(newServicesType);
    } catch (error) {
        console.error(error);
        if (error.message === "Missing required fields") {
            return res.status(400).json({ message: error.message });
        }
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
