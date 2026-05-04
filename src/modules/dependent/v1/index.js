const express = require('express');
const router = express.Router();

const socioRoutes = require('./infraestructure/routes/dependent-router');

router.use(socioRoutes);

module.exports = router;
