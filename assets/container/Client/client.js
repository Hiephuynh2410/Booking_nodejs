const express = require("express");
const router = express.Router();
const MyAuthorized = require("../../../JwtToken/MyAuthorized");

const {
    getAllClient,
    registerClient,
    loginClient,
    changePass,
    deleteClient,
    restoreClient,
} = require("../../../Services/Client.services");

router.use(MyAuthorized);

router.get("/", async (req, res) => {
    try {
        const clients = await getAllClient();
        res.json(clients);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

router.post("/register", async (req, res) => {
    try {
        const newClient = await registerClient(req.body, res);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

router.post("/login", async (req, res) => {
    try {
        const { Username, Password } = req.body;
        const loginResult = await loginClient(Username, Password);
        if (loginResult.success) {
            res.json(loginResult);
        } else {
            res.status(400).json(loginResult);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

router.put("/changePassword/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { Password } = req.body;

        const result = await changePass(id, Password);
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

router.delete("/delete/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const result = await deleteClient(id);
        console.log(result);
        res.json(result);
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
});

router.patch("/restore/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const result = await restoreClient(id);
        console.log(result);
        res.json(result);
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
});
module.exports = router;
