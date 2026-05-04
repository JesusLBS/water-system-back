const express = require('express');
const router = express.Router();

const socioRoutes = require('./infraestructure/routes/Socio.router');

router.use(socioRoutes);

module.exports = router;
