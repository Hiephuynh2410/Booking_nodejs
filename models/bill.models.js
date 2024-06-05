const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize("mysql://root:Hiep2410@127.0.0.1/DLCT");

const BillDetail = require("../models/billDetail.model");

const Bill = sequelize.define("bill", {
    Bill_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    Created_at: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    Date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    Client_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
    }
}, {
    tableName: "bill", 
    timestamps: false,
});

module.exports = Bill;
