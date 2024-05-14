const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize("mysql://root:Hiep2410@127.0.0.1/DLCT");
const Provider = require("../models/provider.model");
const ProductType = require("../models/ProductType.model");

const Product = sequelize.define(
  "Product",
  {
    Product_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    Description: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    Price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    Quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Product_type_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Image: {
      type: DataTypes.STRING(200),
      allowNull: true,
    },
    Provider_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Created_at: {
      type: DataTypes.DATE,
      allowNull: false,
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
    Sold: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    IsDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
  },
  {
    tableName: "Product",
    timestamps: false,
  }
);
Product.belongsTo(Provider, { foreignKey: "Provider_id" });
Product.belongsTo(ProductType, { foreignKey: "Product_type_id" });

module.exports = Product;
