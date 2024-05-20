const express = require("express");
const router = express.Router();
const MyAuthorize = require("../../../JwtToken/MyAuthorized");
const {
  GetAllBlogCate,
  CreateBlogCate,
  updateBlogCate,
  deleteBlogCate,
  restoreBlogCate,
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
router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await deleteBlogCate(id);
    console.log(result);
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

// //restore
router.patch("/restore/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await restoreBlogCate(id);
    console.log(result);
    res.json(result);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});
module.exports = router;
