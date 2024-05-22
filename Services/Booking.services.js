const Branch = require("../models/branch.model");
const Combo = require("../models/combo.model");
const Staff = require("../models/staff.model");
const Client = require("../models/client.model");
const Booking = require("../models/booking.model");

async function getAllBooking() {
    try {
        const bookings = await Booking.findAll({
            where: {
                Status: true,
            },
            include: [
                {
                    model: Branch,
                    attributes: ["Branch_id", "address", "hotline"],
                },
                {
                    model: Combo,
                    attributes: ["Combo_id", "Name", "Price"],
                },
                {
                    model: Staff,
                    attributes: ["Staff_id", "Name"],
                },
                {
                    model: Client,
                    attributes: ["Client_id", "Name"],
                },
            ],
            attributes: {
                exclude: [
                    "Password",
                    "FailedLoginAttempts",
                    "LastFailedLoginAttempt",
                ],
            },
        });
        return bookings;
    } catch (error) {
        throw error;
    }
}

async function createBooking(data, res) {
    try {
        const {
            Name,
            Phone,
            Date_Time,
            Note,
            Client_id,
            Branch_id,
            Staff_id,
            Combo_id,
        } = data;

        const created_at = new Date();
        const status = true;
        const newBooking = await Booking.create({
            Name,
            Phone,
            Date_Time,
            Note,
            Created_at: created_at,
            Status: status,
            Client_id,
            Branch_id,
            Staff_id,
            Combo_id,
        });
        return res
            .status(201)
            .json({ message: "create successfully", booking: newBooking });
    } catch (error) {
        return res
            .status(500)
            .json({ message: "Registration failed: " + error.message });
    }
}

async function softDeleteBooking(id, res) {
    try {
        const booking = await Booking.findByPk(id);
        if (!booking) {
            throw new Error("Booking not found");
        }
        booking.Status = false;
        await booking.save();

        return { success: true, message: "booking deleted successfully" };
    } catch (error) {
        return res
            .status(500)
            .json({ message: "Registration failed: " + error.message });
    }
}

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
    getAllBooking,
    createBooking,
    softDeleteBooking,
    restoreBooking,
};
