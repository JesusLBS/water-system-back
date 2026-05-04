const express = require('express');
const router = express.Router();

const WaterLineController = require('../../interfaces/controllers/water-linescontroller');
const {
  WaterLineIdParamRequest,
  WaterLineIdParamValidation,
  CreateWaterLineBodyRequest,
  CreateWaterLineBodyValidation,
  UpdateWaterLineBodyRequest,
  UpdateWaterLineBodyValidation,
} = require('../../../../../request/waterLine-request');

const controller = new WaterLineController();

router
  .get('/', controller.index)

  .get('/options', controller.options)

  .post('/', CreateWaterLineBodyRequest, CreateWaterLineBodyValidation, controller.store)

  .get('/:waterLineId', WaterLineIdParamRequest, WaterLineIdParamValidation, controller.show)

  .patch(
    '/:waterLineId',
    WaterLineIdParamRequest,
    UpdateWaterLineBodyRequest,
    UpdateWaterLineBodyValidation,
    controller.update
  )

  .delete('/:waterLineId', WaterLineIdParamRequest, WaterLineIdParamValidation, controller.destroy)

  .post('/:waterLineId/activate', WaterLineIdParamRequest, WaterLineIdParamValidation, controller.activate)

  .post('/:waterLineId/deactivate', WaterLineIdParamRequest, WaterLineIdParamValidation, controller.deactivate)

  .get('/:waterLineId/water-takes', WaterLineIdParamRequest, WaterLineIdParamValidation, controller.getWaterTakes);

module.exports = router;
