const express = require('express');
const UserController = require('../../../interfaces/controllers/UserController');
const router = express.Router();
const controller = new UserController();

router
    .post('/login', controller.login);

module.exports = router;