const { param, body } = require('express-validator');
const ValidateHelper = require('../helpers/validation/validateHelper');

const valid = new ValidateHelper();

exports.WaterLineIdParamRequest = [
  param('waterLineId')
    .exists()
    .withMessage('waterLineId is required')
    .notEmpty()
    .withMessage('waterLineId cannot be empty')
    .isInt({ min: 1 })
    .withMessage('waterLineId must be a positive integer'),
];

exports.WaterLineIdParamValidation = (req, res, next) => {
  valid.handleValidation(req, res, next);
};

exports.CreateWaterLineBodyRequest = [
  body('name')
    .exists()
    .withMessage('name is required')
    .notEmpty()
    .withMessage('name cannot be empty')
    .isString()
    .withMessage('name must be a string')
    .isLength({ min: 2, max: 120 })
    .withMessage('name must be between 2 and 120 characters'),
];

exports.CreateWaterLineBodyValidation = (req, res, next) => {
  valid.handleValidation(req, res, next);
};

exports.UpdateWaterLineBodyRequest = [
  body('name')
    .optional()
    .isString()
    .withMessage('name must be a string')
    .isLength({ min: 2, max: 120 })
    .withMessage('name must be between 2 and 120 characters'),
];

exports.UpdateWaterLineBodyValidation = (req, res, next) => {
  valid.handleValidation(req, res, next);
};
