const Branch = require("../../models/branch.model");
const Combo = require("../../models/combo.model");
const Staff = require("../../models/staff.model");
const Client = require("../../models/client.model");
const Booking = require("../../models/booking.model");
const ScheduleDetail = require("../../models/scheduleDetail.model");
const Schedule = require("../../models/schedule.model");

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
                    include: [
                        {
                            model: ScheduleDetail,
                            include: [
                                {
                                    model: Schedule,
                                    attributes: ["Schedule_id", "Time"],
                                },
                            ],
                        },
                    ],
                },
                {
                    model: Client,
                    attributes: ["Client_id", "Name"],
                },
            ],
        });
        return bookings;
    } catch (error) {
        throw error;
    }
}
module.exports = {
    getAllBooking,
};
