const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize("mysql://root:Hiep2410@127.0.0.1/DLCT");

const Branch = require("../models/branch.model");
const Role = require("../models/role.model");

const Staff = sequelize.define(
    "staff",
    {
        Staff_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        Name: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        Username: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        Password: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        Phone: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        Avatar: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        Address: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        Email: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        Status: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },
        IsDisabled: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },
        Role_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        Created_at: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        Updated_at: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        Created_by: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        Updated_by: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        Branch_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        FailedLoginAttempts: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        LastFailedLoginAttempt: {
            type: DataTypes.DATE,
            allowNull: true,
        },
    },
    {
        tableName: "staff",
        timestamps: false,
    }
);

Staff.belongsTo(Branch, { foreignKey: "Branch_id" });
Staff.belongsTo(Role, { foreignKey: "Role_id" });

module.exports = Staff;
