const Booking = require("../../models/booking.model");

async function softDeleteBooking(id, res) {
    try {
        const booking = await Booking.findByPk(id);
        if (!booking) {
            throw new Error("Booking not found");
        }
        booking.Status = false;
        await booking.save();

        return { success: true, message: "booking soft deleted successfully" };
    } catch (error) {
        return res
            .status(500)
            .json({ message: "Registration failed: " + error.message });
    }
}

module.exports = { softDeleteBooking };
