const express = require("express");
const router = express.Router();
const MyAuthorize = require("../../../JwtToken/MyAuthorized");
const {} = require("../../../Services/Schedule.services");

router.use(MyAuthorize);

module.exports = router;
