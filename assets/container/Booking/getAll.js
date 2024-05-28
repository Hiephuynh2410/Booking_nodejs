const express = require("express");
const router = express.Router();
const MyAuthorized = require("../../../JwtToken/MyAuthorized");

const { getAllBooking } = require("../../../Services/Booking.services");
router.use(MyAuthorized);

router.get("/", async (req, res) => {
    try {
        const bookings = await getAllBooking();
        res.json(bookings);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
