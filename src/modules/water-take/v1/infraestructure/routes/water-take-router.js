const express = require('express');
const router = express.Router();
const WaterTakeController = require('../../interfaces/controllers/water-take-controller');
const controller = new WaterTakeController();

router.post('/', controller.store);

module.exports = router;
