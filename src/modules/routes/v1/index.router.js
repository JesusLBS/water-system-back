const express = require('express');
const router = express.Router();

const authModule = require('../../auth');
const userModule = require('../../users');
const socioModule = require('../../socios');

//Modules
authModule(router);
userModule(router);
socioModule(router);

module.exports = router;
