const express = require("express");
const router = express.Router();
const MyAuthorize = require("../../../JwtToken/MyAuthorized");
const {
    getAllSchedule,
    createSchedule,
    deleteSchedule,
    restoreSchedule,
} = require("../../../Services/Schedule.services");

router.use(MyAuthorize);
router.get("/", async (req, res) => {
    try {
        const schedule = await getAllSchedule(req, res);
        res.json(schedule);
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
});

router.post("/create", async (req, res) => {
    try {
        const newSchedule = await createSchedule(req.body, res);
        return json(newSchedule);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

router.delete("/delete/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const result = await deleteSchedule(id);
        console.log(result);
        res.json(result);
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
});

router.patch("/restore/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const result = await restoreSchedule(id);
        console.log(result);
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});
module.exports = router;
