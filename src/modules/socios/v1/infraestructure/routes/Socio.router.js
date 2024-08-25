const express = require('express');
const SocioController = require('../../interfaces/controllers/SocioController');
const { SocioRequest, SocioValidation } = require('../../../../../request/SocioRequest');
const { UserUidBodyRequest, UserUidBodyValidation } = require('../../../../../request/UserUidBodyRequest');
const { UserUidParamRequest, UserUidParamValidation } = require('../../../../../request/UserUidParamRequest');
const router = express.Router();
const controller = new SocioController();

router
  .get('/:limit/:page/:sort/:direction/:withTrashed/:search', controller.index)
  .post('/', SocioRequest, SocioValidation, controller.store)
  .put('/', SocioRequest, SocioValidation, controller.update)
  .post('/deactivate', UserUidBodyRequest, UserUidBodyValidation, controller.deactivate)
  .post('/restore', UserUidBodyRequest, UserUidBodyValidation, controller.activate)
  .delete('/:dataId', UserUidParamRequest, UserUidParamValidation, controller.destroy)
  .get('/:dataId', UserUidParamRequest, UserUidParamValidation, controller.show);

module.exports = router;
