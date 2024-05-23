const Branch = require("../models/branch.model");
const Combo = require("../models/combo.model");
const Staff = require("../models/staff.model");
const Client = require("../models/client.model");
const Booking = require("../models/booking.model");
const ScheduleDetail = require("../models/scheduleDetail.model");
const Schedule = require("../models/schedule.model");
const moment = require("moment");
const { Op } = require("sequelize");
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

        const client = await Client.findOne({
            where: { Client_id: Client_id },
        });
        if (!client) {
            return res.status(400).json({
                message:
                    "Client does not exist. Please provide a valid Client_id.",
            });
        }

        const staffMember = await Staff.findOne({
            where: {
                Staff_id: Staff_id,
                Branch_id: Branch_id,
            },
        });

        if (!staffMember) {
            return res.status(400).json({
                message:
                    "Nhân viên không có trong chi nhánh hiện tại vui lòng chọn chi nhánh khác hoặc chọn nhân viên khác.",
            });
        }

        const bookingDate = moment.utc(Date_Time).format("YYYY-MM-DD");
        const bookingTime = moment.utc(Date_Time).format("HH:mm:ss");

        const scheduleDetail = await ScheduleDetail.findOne({
            where: {
                Staff_id: Staff_id,
                Date: {
                    [Op.eq]: moment.utc(Date_Time).startOf("day").toDate(),
                },
            },
            include: [
                {
                    model: Schedule,
                    where: {
                        Time: bookingTime,
                    },
                },
            ],
        });

        if (!scheduleDetail) {
            return res.status(400).json({
                message:
                    "Nhân viên không có trong lịch trình được chọn vào thời gian này. Vui lòng chọn thời gian hoặc nhân viên khác.",
            });
        }

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

        return res.status(201).json({
            message: "Booking created successfully",
            booking: newBooking,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Booking creation failed: " + error.message,
        });
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
