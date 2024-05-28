const express = require("express");
const router = express.Router();
const MyAuthorizer = require("../../../JwtToken/MyAuthorized");
const {
    restoreblog,
} = require("../../../Services/BlogServices/restoreServices");

router.use(MyAuthorizer);

//restore
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
