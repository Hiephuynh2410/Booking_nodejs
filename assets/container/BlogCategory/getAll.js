const express = require("express");
const router = express.Router();
const MyAuthorize = require("../../../JwtToken/MyAuthorized");
const { GetAllBlogCate } = require("../../../Services/BlogCategory.services");
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

module.exports = router;
