const Booking = require("../../models/booking.model");

async function restoreBooking(id, res) {
    try {
        const booking = await Booking.findByPk(id);

        if (!booking) {
            throw new Error("booking not found");
        }
        booking.Status = true;
        await booking.save();
        return { success: true, message: "booking restore successfully" };
    } catch (error) {
        return res
            .status(500)
            .json({ message: "delete failed: " + error.message });
    }
}

module.exports = {
    restoreBooking,
};
