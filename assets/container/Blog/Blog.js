const express = require("express");
const router = express.Router();
const MyAuthorizer = require("../../../JwtToken/MyAuthorized");
const {
  GetAllBlog,
  createBlog,
  updateBlog,
  deleteBlog,
  restoreblog,
} = require("../../../Services/Blog.services");

router.use(MyAuthorizer);
//get all
router.get("/", async (req, res) => {
  try {
    const blog = await GetAllBlog(req, res);
    res.json(blog);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

//create
router.post("/create", async (req, res) => {
  try {
    const newBlog = await createBlog(req.body, res);
    res.status(201).json(newBlog);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// //update
router.put("/update/:id", async (req, res) => {
  try {
    const BlogId = req.params.id;
    const updateData = req.body;
    const updateblog = await updateBlog(BlogId, updateData);
    res.json(updateblog);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

// //delete
router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await deleteBlog(id);
    console.log(result);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// //restore
router.patch("/restore/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await restoreblog(id);
    console.log(result);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});
module.exports = router;
