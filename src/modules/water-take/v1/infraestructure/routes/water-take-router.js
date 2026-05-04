const express = require('express');
const router = express.Router();
const WaterTakeController = require('../../interfaces/controllers/water-take-controller');
const {
  AssignWaterLineBodyRequest,
  AssignWaterLineBodyValidation,
} = require('../../../../../request/water-take-request');
const controller = new WaterTakeController();

router
  .post('/', AssignWaterLineBodyRequest, AssignWaterLineBodyValidation, controller.store)
  .patch('/:id/deactivate', controller.deactivate)
  .patch('/:id/restore', controller.restore);

module.exports = router;
