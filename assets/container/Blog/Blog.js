const express = require("express");
const router = express.Router();
const Blog = require("../../../models/blog.model");
const BlogCategory = require("../../../models/blogCategory.model");
const Staff = require("../../../models/staff.model");

//get all
router.get("/", async (req, res) => {
  try {
    const blog = await Blog.findAll({
      where: {
        IsDeleted: true,
      },
      include: [
        {
          model: BlogCategory,
          attributes: ["Blog_category_id", "Title", "Description"],
        },
        {
          model: Staff,
          attributes: ["Name", "Phone", "Avatar", "Email"],
        },
      ],
    });
    res.json(blog);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

//create
router.post("/create", async (req, res) => {
  try {
    const { Title, Body, Thumbnail, Blog_category_id, Staff_id } = req.body;

    if (!Title || !Body || !Blog_category_id || !Staff_id) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newBlogPost = await Blog.create({
      Title,
      Body,
      Thumbnail,
      Blog_category_id,
      Staff_id,
      Date_time: new Date(),
      IsDeleted: true,
    });

    res.status(201).json(newBlogPost);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

//update
router.put("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const { Title, Body, Thumbnail } = req.body;

    const blog = await Blog.findByPk(id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    blog.Title = Title || blog.Title;
    blog.Body = Body || blog.Body;
    blog.Thumbnail = Thumbnail || blog.Thumbnail;

    await blog.save();
    res.json({ message: "Update success", blog });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

//delete
router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const blog = await Blog.findByPk(id);
    if (!blog) {
      return res.status(404).json({ message: "blog not found" });
    }

    blog.IsDeleted = false;
    await blog.save();

    res.json({ message: `blog ${id} deleted successfully` });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

//restore
router.patch("/restore/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const blog = await Blog.findByPk(id);
    if (!blog) {
      return res.status(404).json({ message: "blog not found" });
    }

    blog.IsDeleted = true;
    await blog.save();

    res.json({ message: `blog ${id} restored successfully` });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});
module.exports = router;
