const { check } = require('express-validator');
const ValidateHelper = require('../helpers/validation/validateHelper');

const valid = new ValidateHelper();

exports.AssignWaterLineBodyRequest = [
  check('uid')
    .exists()
    .withMessage('uid is required')
    .notEmpty()
    .withMessage('uid cannot be empty')
    .isUUID()
    .withMessage('uid must be a valid UUID'),

  check('waterLineId')
    .exists()
    .withMessage('waterLineId is required')
    .notEmpty()
    .withMessage('waterLineId cannot be empty')
    .isInt({ min: 1 })
    .withMessage('waterLineId must be a positive integer'),
];

exports.AssignWaterLineBodyValidation = (req, res, next) => {
  valid.handleValidation(req, res, next);
};
