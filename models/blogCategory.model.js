const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize("mysql://root:Hiep2410@127.0.0.1/DLCT");

const BlogCategory = sequelize.define(
  "blog_categories",
  {
    Blog_category_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Title: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    Description: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    IsDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
  },
  {
    tableName: "blog_categories",
    timestamps: false,
  }
);

module.exports = BlogCategory;
