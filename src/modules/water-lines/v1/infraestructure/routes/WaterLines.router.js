const express = require('express');
const router = express.Router();
const WaterLineController = require('../../interfaces/controllers/water-linescontroller');
const controller = new WaterLineController();

router.get('/', controller.index);
router.get('/options', controller.options);

module.exports = router;
