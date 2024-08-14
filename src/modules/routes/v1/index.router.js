const express = require("express");
const router = express.Router();

const authModule = require("../../auth");
const userModule = require("../../users");

// Módulo de autenticación
authModule(router);
userModule(router);

module.exports = router;
