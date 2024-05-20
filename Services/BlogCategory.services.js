const BlogCategory = require("../models/blogCategory.model");

async function GetAllBlogCate(res) {
  try {
    const blogCategogry = await BlogCategory.findAll({
      where: {
        IsDeleted: true, //1:true, 0: false
      },
      attributes: { exclude: ["IsDeleted"] },
    });
    return blogCategogry;
  } catch (error) {
    return res
      .status(500)
      .json({ message: "get all failed: " + error.message });
  }
}

async function CreateBlogCate(data, res) {
  try {
    const { Title, Description } = data;
    if (!Title || !Description) {
      throw new Error("Title and desc is required");
    }
    const newBlogCate = await BlogCategory.create({
      Title,
      Description,
      IsDeleted: true,
    });
    return res
      .status(201)
      .json({ message: "create successful", BlogCate: newBlogCate });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "get all failed: " + error.message });
  }
}

async function updateBlogCate(id, updateData) {
  try {
    const blogCategory = await BlogCategory.findByPk(id);
    if (!blogCategory) {
      throw new Error("Blog category not found");
    }
    const updatedBlogCate = await blogCategory.update(updateData);
    return updatedBlogCate;
  } catch (error) {
    throw new Error("Update failed: " + error.message);
  }
}

module.exports = { GetAllBlogCate, CreateBlogCate, updateBlogCate };
