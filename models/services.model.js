const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize("mysql://root:Hiep2410@127.0.0.1/DLCT");
const ServiceType = require("..//models/serviceType.model");

const Service = sequelize.define(
    "service",
    {
        Service_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        Name: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        Price: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        Status: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },
        Service_type_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: ServiceType,
                key: "Service_type_id",
            },
        },
        Created_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: Sequelize.NOW,
        },
        Created_by: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        Updated_at: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        Updated_by: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        IsDeleted: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },
    },
    {
        tableName: "service",
        timestamps: false,
    }
);

Service.belongsTo(ServiceType, { foreignKey: "Service_type_id" });

module.exports = Service;
