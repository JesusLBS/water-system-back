const express = require('express');
const router = express.Router();

const authModule = require('../../auth');
const userModule = require('../../users');
const socioModule = require('../../socios');
const waterLineModule = require('../../water-lines');
const dependentModule = require('../../dependent');

//Modules
authModule(router);
userModule(router);
socioModule(router);
waterLineModule(router);
dependentModule(router);

module.exports = router;
