const { check } = require('express-validator');
const ValidateHelper = require('../helpers/validation/validateHelper');

const valid = new ValidateHelper();

exports.SocioRequest = [
  check('userData')
    .exists()
    .withMessage('userData is required')
    .notEmpty()
    .withMessage('userData cannot be empty')
    .isObject()
    .withMessage('userData must be an object'),

  check('addressData')
    .exists()
    .withMessage('addressData is required')
    .notEmpty()
    .withMessage('addressData cannot be empty')
    .isObject()
    .withMessage('addressData must be an object'),

  check('profileData')
    .exists()
    .withMessage('profileData is required')
    .notEmpty()
    .withMessage('profileData cannot be empty')
    .isObject()
    .withMessage('profileData must be an object'),
];

exports.SocioValidation = (req, res, next) => {
  valid.handleValidation(req, res, next);
};
