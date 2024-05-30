const express = require("express");
const router = express.Router();
const MyAuthorized = require("../../../JwtToken/MyAuthorized");
const {
    getAllServicesType,
} = require("../../../Services/ServicesTypeServices/getAll.services");

router.use(MyAuthorized);
//get all
router.get("/", async (req, res) => {
    try {
        const servicesType = await getAllServicesType(req, res); // Pass req and res objects
        res.json(servicesType);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});
module.exports = router;
