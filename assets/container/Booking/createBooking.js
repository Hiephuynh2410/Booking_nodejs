const express = require("express");
const router = express.Router();
const MyAuthorized = require("../../../JwtToken/MyAuthorized");

const { createBooking } = require("../../../Services/Booking.services");
router.use(MyAuthorized);

router.post("/create", async (req, res) => {
    try {
        const newBooking = await createBooking(req.body, res);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
