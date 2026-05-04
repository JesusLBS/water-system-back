const { check } = require('express-validator');
const ValidateHelper = require('../helpers/validation/validateHelper');

const valid = new ValidateHelper();

exports.UserUidBodyRequest = [
  check('dataId')
    .exists()
    .withMessage('dataId is required')
    .notEmpty()
    .withMessage('dataId cannot be empty')
    .isUUID()
    .withMessage('dataId must be a valid UUID'),
];

exports.UserUidBodyValidation = (req, res, next) => {
  valid.handleValidation(req, res, next);
};
