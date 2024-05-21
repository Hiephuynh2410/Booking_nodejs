const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize("mysql://root:Hiep2410@127.0.0.1/DLCT");

const Combo = sequelize.define(
    "combo",
    {
        Combo_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        Name: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        Price: {
            type: DataTypes.DECIMAL(10, 0),
            allowNull: true,
        },
        IsDeleted: {
            type: DataTypes.BOOLEAN,
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
        IsDeleted: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },
    },
    {
        tableName: "combo",
        timestamps: false,
    }
);

module.exports = Combo;
