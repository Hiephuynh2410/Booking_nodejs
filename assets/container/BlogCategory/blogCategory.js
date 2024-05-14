const express = require("express");
const router = express.Router();
const BlogCategory = require("../../../models/blogCategory.model");

// Get all blogCategory
router.get("/", async (req, res) => {
  try {
    const blogCategogry = await BlogCategory.findAll({
      where: {
        IsDeleted: true, //1:true, 0: false
      },
      attributes: { exclude: ["IsDeleted"] },
    });
    res.json(blogCategogry);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

//create
router.post("/create", async (req, res) => {
  try {
    const { Title, Description } = req.body;
    if (!Title || !Description) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const newBlogCategory = await BlogCategory.create({
      Title,
      Description,
      IsDeleted: true,
    });
    res.status(201).json(newBlogCategory);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

//update
router.put("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { Title, Description } = req.body;

    if (!Title || !Description) {
      return res
        .status(400)
        .json({ message: "Title and description are required" });
    }

    const blogCategory = await BlogCategory.findByPk(id);

    if (!blogCategory) {
      return res.status(404).json({ message: "Blog category not found" });
    }

    await blogCategory.update({
      Title,
      Description,
    });

    res.json(blogCategory);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

//delete
router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const blog_categories = await BlogCategory.findByPk(id);
    if (!blog_categories) {
      return res.status(404).json({ message: "blog categories not found" });
    }

    blog_categories.IsDeleted = false;
    await blog_categories.save();
    res.json({ message: `blog_categories ${id} deleted successfully` });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

//restore
router.patch("/restore/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const blog_categories = await BlogCategory.findByPk(id);
    if (!blog_categories) {
      return res.status(404).json({ message: "blog_categories not found" });
    }

    blog_categories.IsDeleted = true;
    await blog_categories.save();

    res.json({ message: `blog_categories ${id} restored successfully` });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});
module.exports = router;
