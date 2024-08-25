const express = require('express');
const router = express.Router();
const waterLinesoutes = require('./infraestructure/routes/WaterLines.router');

router.use(waterLinesoutes);

module.exports = router;
