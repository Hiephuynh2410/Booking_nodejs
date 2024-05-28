const express = require("express");
const router = express.Router();
const MyAuthorize = require("../../../JwtToken/MyAuthorized");
const {
    createbranch,
} = require("../../../Services/BranchServices/create.services");
const { json } = require("sequelize");

router.use(MyAuthorize);

// //create
router.post("/create", async (req, res) => {
    try {
        const newbrnach = await createbranch(req.body, res);
        return json(newbrnach);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
