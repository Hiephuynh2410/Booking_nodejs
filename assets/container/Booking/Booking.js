const express = require("express");
const router = express.Router();
const MyAuthorized = require("../../../JwtToken/MyAuthorized");

const {
    getAllBooking,
    createBooking,
    softDeleteBooking,
    restoreBooking,
} = require("../../../Services/Booking.services");
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

router.post("/create", async (req, res) => {
    try {
        const newBooking = await createBooking(req.body, res);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

router.delete("/delete/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const result = await softDeleteBooking(id);
        console.log(result);
        res.json(result);
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
});

router.patch("/restore/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const result = await restoreBooking(id);
        console.log(result);
        res.json(result);
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
});
module.exports = router;
