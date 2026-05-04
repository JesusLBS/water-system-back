const express = require('express');
const router = express.Router();
const waterTakesRoutes = require('./infraestructure/routes/water-take-router');

router.use(waterTakesRoutes);

module.exports = router;
