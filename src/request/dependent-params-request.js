const { param } = require('express-validator');
const ValidateHelper = require('../helpers/validation/validateHelper');

const errorValueParameter = 'The parameter is required';
const valid = new ValidateHelper();

exports.DependentParamsRequest = [
  param('socioUid', errorValueParameter)
    .exists()
    .notEmpty()
    .withMessage('SocioUid is required')
    .isUUID()
    .withMessage('SocioUid must be a valid UUID'),
];

exports.DependentParamsValidation = (req, res, next) => {
  valid.handleValidation(req, res, next);
};
