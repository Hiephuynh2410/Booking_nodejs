const express = require("express");
const router = express.Router();
const MyAuthorize = require("../../../JwtToken/MyAuthorized");
const {
    updateBlogCate,
} = require("../../../Services/BlogCategoryServices/update.services");
router.use(MyAuthorize);

//update
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

module.exports = router;
