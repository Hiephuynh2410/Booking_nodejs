const express = require("express");
const router = express.Router();
const MyAuthorize = require("../../../JwtToken/MyAuthorized");
const {
    deleteBlogCate,
} = require("../../../Services/BlogCategoryServices/delete.services");
router.use(MyAuthorize);

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

module.exports = router;
