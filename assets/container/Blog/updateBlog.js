const express = require("express");
const router = express.Router();
const MyAuthorizer = require("../../../JwtToken/MyAuthorized");
const {
    updateBlog,
} = require("../../../Services/BlogServices/updateBlogServices");

router.use(MyAuthorizer);

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

module.exports = router;
