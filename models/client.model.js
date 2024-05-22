const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize("mysql://root:Hiep2410@127.0.0.1/DLCT");

const Role = require("./role.model");

const Client = sequelize.define(
    "client",
    {
        Client_id: {
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
        Status: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },
        Role_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
    },
    {
        tableName: "client",
        timestamps: false,
    }
);

Client.belongsTo(Role, { foreignKey: "Role_id" });
module.exports = Client;
