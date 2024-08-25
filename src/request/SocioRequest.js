const { check } = require('express-validator');
const ValidateHelper = require('../helpers/validation/ validateHelper');
const errorValueParameter = 'The parameter is required';
const valid = new ValidateHelper();

exports.SocioRequest = [
  check('userData', errorValueParameter)
    .exists()
    .custom((value) => valid.isValid(value)),
  check('addressData', errorValueParameter)
    .exists()
    .custom((value) => valid.isValid(value)),
  check('profileData', errorValueParameter)
    .exists()
    .custom((value) => valid.isValid(value)),
];

exports.SocioValidation = (req, res, next) => {
  valid.validationResult(req, res, next);
};
