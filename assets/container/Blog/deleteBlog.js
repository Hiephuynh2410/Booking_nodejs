const express = require("express");
const router = express.Router();
const MyAuthorizer = require("../../../JwtToken/MyAuthorized");
const { deleteBlog } = require("../../../Services/Blog.services");

router.use(MyAuthorizer);

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

module.exports = router;
