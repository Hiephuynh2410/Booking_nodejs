const express = require("express");
const router = express.Router();
const MyAuthorized = require("../../../JwtToken/MyAuthorized");
const {
    createService,
} = require("../../../Services/ServicesService/create.services");

router.use(MyAuthorized);

router.post("/create", async (req, res) => {
    try {
        const { Name, Price, Service_type_id } = req.body;

        const newService = await createService(Name, Price, Service_type_id);
        res.status(201).json(newService);
    } catch (error) {
        console.error(error);
        if (error.message === "Missing required fields") {
            return res.status(400).json({ message: error.message });
        }
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
