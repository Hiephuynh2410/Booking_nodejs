const express = require('express');
const router = express.Router();

router.use('/staff', require('../assets/container/Staff/staff'));

module.exports = router;
