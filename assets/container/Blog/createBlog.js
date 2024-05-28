const express = require("express");
const router = express.Router();
const MyAuthorizer = require("../../../JwtToken/MyAuthorized");
const { createBlog } = require("../../../Services/Blog.services");

router.use(MyAuthorizer);

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

module.exports = router;
