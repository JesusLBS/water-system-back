const express = require('express');
const router = express.Router();

const authModule = require('../../auth');

// Módulo de autenticación
authModule(router);

module.exports = router;
