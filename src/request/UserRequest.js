const { check } = require('express-validator');
const ValidateHelper = require('../helpers/validation/validateHelper');

const valid = new ValidateHelper();

exports.UserRequest = [
  check('uid')
    .optional() // allow update without uid if handled elsewhere
    .notEmpty()
    .withMessage('uid is required')
    .isAlphanumeric()
    .withMessage('uid must be alphanumeric'),

  check('name').exists().withMessage('name is required').notEmpty().withMessage('name cannot be empty').isString(),

  check('email').exists().withMessage('email is required').isEmail().withMessage('email must be valid'),

  check('roleId').exists().withMessage('roleId is required').isInt().withMessage('roleId must be an integer'),
];

exports.UserValidation = (req, res, next) => {
  valid.handleValidation(req, res, next);
};
