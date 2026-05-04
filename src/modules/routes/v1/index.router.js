const express = require('express');
const router = express.Router();

const authModule = require('../../auth');
const userModule = require('../../users');
const socioModule = require('../../socios');
const waterLineModule = require('../../water-lines');
const dependentModule = require('../../dependent');
const waterTakeModule = require('../../water-take');

//Modules
authModule(router);
userModule(router);
socioModule(router);
waterLineModule(router);
dependentModule(router);
waterTakeModule(router);

module.exports = router;
