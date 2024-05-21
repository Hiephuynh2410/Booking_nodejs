const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize("mysql://root:Hiep2410@127.0.0.1/DLCT");

const Role = sequelize.define(
    "role",
    {
        Role_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        Name: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        tableName: "role",
        timestamps: false,
    }
);

module.exports = Role;
