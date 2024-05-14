const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize("mysql://root:Hiep2410@127.0.0.1/DLCT");
const BlogCategory = require("../models/blogCategory.model");
const Staff = require("../models/staff.model");

const BlogPost = sequelize.define(
  "blog_posts",
  {
    Blog_post_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Title: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    Body: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    Thumbnail: {
      type: DataTypes.STRING(250),
      allowNull: true,
    },
    Date_time: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    IsDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    IsDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
  },
  {
    tableName: "blog_posts",
    timestamps: false,
  }
);

BlogPost.belongsTo(BlogCategory, { foreignKey: "Blog_category_id" });
BlogPost.belongsTo(Staff, { foreignKey: "Staff_id" });

module.exports = BlogPost;
