const express = require("express");
const router = express.Router();
const MyAuthorize = require("../../../JwtToken/MyAuthorized");
const {
    restorebranch,
} = require("../../../Services/BranchServices/restore.services");

router.use(MyAuthorize);

// //restore
router.patch("/restore/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const result = await restorebranch(id);
        console.log(result);
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});
module.exports = router;
