const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize("mysql://root:Hiep2410@127.0.0.1/DLCT");

const Branch = sequelize.define(
    "branch",
    {
        Branch_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        Address: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        Hotline: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        IsDeleted: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },
    },
    {
        tableName: "branch",
        timestamps: false,
    }
);

module.exports = Branch;
