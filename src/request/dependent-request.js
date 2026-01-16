const { check } = require('express-validator');
const ValidateHelper = require('../helpers/validation/validateHelper');
const errorValueParameter = 'The parameter is required';
const valid = new ValidateHelper();

exports.DependentRequest = [
  check('socioUid', errorValueParameter)
    .exists()
    .custom((value) => valid.isValid(value)),
  check('dependents', errorValueParameter)
    .exists()
    .custom((value) => valid.isValid(value)),
];

exports.DependentValidation = (req, res, next) => {
  valid.validationResult(req, res, next);
};
