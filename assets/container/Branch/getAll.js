const express = require("express");
const router = express.Router();
const MyAuthorize = require("../../../JwtToken/MyAuthorized");
const {
    GetAllBranch,
} = require("../../../Services/BranchServices/getAll.services");

router.use(MyAuthorize);
router.get("/", async (req, res) => {
    try {
        const branch = await GetAllBranch(req, res);
        res.json(branch);
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
