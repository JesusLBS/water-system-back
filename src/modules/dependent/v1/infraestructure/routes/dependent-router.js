const express = require('express');
const DependentController = require('../../interfaces/controllers/dependent-controller');
const { DependentRequest, DependentValidation } = require('../../../../../request/dependent-request');
const {
  DependentUidParamRequest,
  DependentUidParamValidation,
} = require('../../../../../request/dependent-uid-param-request');
const router = express.Router();
const controller = new DependentController();

router
  .post('/', DependentRequest, DependentValidation, controller.store)
  .put('/', controller.update)
  .delete('/:dataId/:socioUid', controller.destroy)
  .get('/per-socio/:dataId', DependentUidParamRequest, DependentUidParamValidation, controller.getDependentsPerSocio)
  .get('/:dataId', controller.show);

module.exports = router;
