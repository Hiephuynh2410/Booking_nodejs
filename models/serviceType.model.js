const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize("mysql://root:Hiep2410@127.0.0.1/DLCT");

const ServicesType = sequelize.define(
    "servicetype",
    {
        Service_type_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        Name: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        IsDeleted: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },
    },
    {
        tableName: "servicetype",
        timestamps: false,
    }
);

module.exports = ServicesType;
