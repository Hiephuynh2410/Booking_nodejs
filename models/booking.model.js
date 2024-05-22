const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize("mysql://root:Hiep2410@127.0.0.1/DLCT");

const Client = require("../models/client.model");
const staff = require("../models/staff.model");
const combo = require("../models/combo.model");
const branch = require("../models/branch.model");

const Booking = sequelize.define(
    "booking",
    {
        Booking_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        Name: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        Phone: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        Date_time: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        Note: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        Status: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },
        Created_at: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        Client_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        Branch_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        Staff_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        Combo_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
    },
    {
        tableName: "booking",
        timestamps: false,
    }
);
Booking.belongsTo(branch, { foreignKey: "Branch_id" });
Booking.belongsTo(combo, { foreignKey: "Combo_id" });
Booking.belongsTo(staff, { foreignKey: "Staff_id" });
Booking.belongsTo(Client, { foreignKey: "Client_id" });
module.exports = Booking;
