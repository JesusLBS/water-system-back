const { param } = require('express-validator');
const ValidateHelper = require('../helpers/validation/validateHelper');

const errorValueParameter = 'The parameter is required';
const valid = new ValidateHelper();

exports.DependentShowParamsRequest = [
  param('socioUid', errorValueParameter)
    .exists()
    .notEmpty()
    .withMessage('SocioUid is required')
    .isUUID()
    .withMessage('SocioUid must be a valid UUID'),

  param('dependentId', errorValueParameter)
    .exists()
    .notEmpty()
    .withMessage('DependentId is required')
    .isInt()
    .withMessage('DependentId must be a valid integer'),
];

exports.DependentShowParamsValidation = (req, res, next) => {
  valid.handleValidation(req, res, next);
};
