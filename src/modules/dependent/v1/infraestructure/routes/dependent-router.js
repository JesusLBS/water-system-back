const express = require('express');
const DependentController = require('../../interfaces/controllers/dependent-controller');
const {
  DependentParamsRequest,
  DependentParamsValidation,
} = require('../../../../../request/dependent-params-request');
const { DependentValidation, DependentRequest } = require('../../../../../request/dependent-request');
const {
  DependentShowParamsRequest,
  DependentShowParamsValidation,
} = require('../../../../../request/dependent-request-show-request');
const {
  DependentUpdateRequest,
  DependentUpdateValidation,
} = require('../../../../../request/dependent-update-request');

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
  .get(
    '/socios/:socioUid/dependents/:dependentId',
    DependentShowParamsRequest,
    DependentShowParamsValidation,
    controller.show
  )
  .patch(
    '/socios/:socioUid/dependents/:dependentId',
    DependentShowParamsRequest,
    DependentShowParamsValidation,
    DependentUpdateRequest,
    DependentUpdateValidation,
    controller.update
  )
  .delete(
    '/socios/:socioUid/dependents/:dependentId',
    DependentParamsRequest,
    DependentParamsValidation,
    controller.destroy
  );

module.exports = router;
