const express = require("express");
const router = express.Router();
const MyAuthorized = require("../../../JwtToken/MyAuthorized");
const {
    GetAllServices,
} = require("../../../Services/ServicesService/getAll.Services");

router.use(MyAuthorized);
//get all
router.get("/", async (req, res) => {
    try {
        const services = await GetAllServices(req, res);
        res.json(services);
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
