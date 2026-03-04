const express = require('express');
const DependentController = require('../../interfaces/controllers/dependent-controller');
const {
  DependentParamsRequest,
  DependentParamsValidation,
} = require('../../../../../request/dependent-params-request');
const { DependentValidation, DependentRequest } = require('../../../../../request/dependent-request');

const router = express.Router();
const controller = new DependentController();

router
  .get('/socios/:socioUid/dependents', DependentParamsRequest, DependentParamsValidation, controller.indexBySocio)
  .post(
    '/socios/:socioUid/dependents',
    DependentParamsRequest,
    DependentParamsValidation,
    DependentRequest,
    DependentValidation,
    controller.store
  )
  .get('/socios/:socioUid/dependents/:dependentUid', DependentParamsRequest, DependentParamsValidation, controller.show)
  .patch(
    '/socios/:socioUid/dependents/:dependentUid',
    DependentParamsRequest,
    DependentParamsValidation,
    DependentRequest,
    DependentValidation,
    controller.update
  )
  .delete(
    '/socios/:socioUid/dependents/:dependentUid',
    DependentParamsRequest,
    DependentParamsValidation,
    controller.destroy
  );

module.exports = router;
