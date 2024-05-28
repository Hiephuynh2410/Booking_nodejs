const express = require("express");
const router = express.Router();
const MyAuthorizer = require("../../../JwtToken/MyAuthorized");
const { GetAllBlog } = require("../../../Services/Blog.services");

router.use(MyAuthorizer);
router.get("/", async (req, res) => {
    try {
        const blog = await GetAllBlog(req, res);
        res.json(blog);
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
