const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize("mysql://root:Hiep2410@127.0.0.1/DLCT");

const Schedule = sequelize.define(
    "schedule",
    {
        Schedule_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        Time: {
            type: DataTypes.Time,
            allowNull: true,
        },
        IsDeleted: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },
    },
    {
        tableName: "schedule",
        timestamps: false,
    }
);

module.exports = Schedule;
