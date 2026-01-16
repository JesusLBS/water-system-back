const { param } = require('express-validator');
const ValidateHelper = require('../helpers/validation/validateHelper');

const valid = new ValidateHelper();

exports.UserUidParamRequest = [
  param('dataId')
    .exists()
    .withMessage('dataId is required')
    .notEmpty()
    .withMessage('dataId cannot be empty')
    .isAlphanumeric()
    .withMessage('dataId must be alphanumeric'),
];

exports.UserUidParamValidation = (req, res, next) => {
  valid.handleValidation(req, res, next);
};
