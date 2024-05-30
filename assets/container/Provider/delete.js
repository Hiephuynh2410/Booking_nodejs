const express = require("express");
const router = express.Router();
const MyAuthorized = require("../../../JwtToken/MyAuthorized");
const {
    deleteProvider,
} = require("../../../Services/ProviderServices/delete.services");

router.use(MyAuthorized);

// //delete
router.delete("/delete/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const result = await deleteProvider(id);
        res.json(result);
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
});
module.exports = router;
