const express = require("express");
const router = express.Router();
const MyAuthorize = require("../../../JwtToken/MyAuthorized");
const {
  GetAllBlogCate,
  CreateBlogCate,
  updateBlogCate,
} = require("../../../Services/BlogCategory.services");
// Get all blogCategory
router.use(MyAuthorize);
router.get("/", async (req, res) => {
  try {
    const blog_categories = await GetAllBlogCate(req, res);
    res.json(blog_categories);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// //create
router.post("/create", async (req, res) => {
  try {
    const newBlogCate = await CreateBlogCate(req.body, res);
    newBlogCate;
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

// //update
router.put("/update/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updateData = req.body;
    const updatedBlogCate = await updateBlogCate(id, updateData);
    res.json(updatedBlogCate);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// //delete
// router.delete("/delete/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const blog_categories = await BlogCategory.findByPk(id);
//     if (!blog_categories) {
//       return res.status(404).json({ message: "blog categories not found" });
//     }

//     blog_categories.IsDeleted = false;
//     await blog_categories.save();
//     res.json({ message: `blog_categories ${id} deleted successfully` });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send("Internal Server Error");
//   }
// });

// //restore
// router.patch("/restore/:id", async (req, res) => {
//   try {
//     const { id } = req.params;

//     const blog_categories = await BlogCategory.findByPk(id);
//     if (!blog_categories) {
//       return res.status(404).json({ message: "blog_categories not found" });
//     }

//     blog_categories.IsDeleted = true;
//     await blog_categories.save();

//     res.json({ message: `blog_categories ${id} restored successfully` });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Internal Server Error");
//   }
// });
module.exports = router;
