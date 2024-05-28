const express = require("express");
const router = express.Router();
const MyAuthorize = require("../../../JwtToken/MyAuthorized");
const { CreateBlogCate } = require("../../../Services/BlogCategory.services");
router.use(MyAuthorize);

router.post("/create", async (req, res) => {
    try {
        const newBlogCate = await CreateBlogCate(req.body, res);
        newBlogCate;
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
