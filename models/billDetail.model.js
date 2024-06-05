const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize("mysql://root:Hiep2410@127.0.0.1/DLCT");

const Bill = require("../models/bill.models");

const Billdetail = sequelize.define("billdetail", {
    Bill_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    Product_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    Quantity: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    Price: {
        type: DataTypes.FLOAT,
        allowNull: true,
    }
}, {
    tableName: "billdetail",
    timestamps: false,
});

module.exports = Billdetail;
