const { check } = require('express-validator');
const ValidateHelper = require('../helpers/validation/validateHelper');

const errorValueParameter = 'The parameter is required';
const valid = new ValidateHelper();

exports.DependentRequest = [
  check('name', errorValueParameter).exists().notEmpty().withMessage('Name is required'),

  check('relationship', errorValueParameter).exists().notEmpty().withMessage('Relationship is required'),

  check('birthDate').optional().isISO8601().withMessage('BirthDate must be valid date'),
];

exports.DependentValidation = (req, res, next) => {
  valid.handleValidation(req, res, next);
};
