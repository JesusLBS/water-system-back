const { check } = require('express-validator');
const ValidateHelper = require('../helpers/validation/validateHelper');

const valid = new ValidateHelper();

exports.DependentRequest = [
  check('dependents')
    .exists()
    .withMessage('Dependents are required')
    .bail()
    .isArray({ min: 1 })
    .withMessage('Dependents must be a non empty array'),

  check('dependents.*.name')
    .exists()
    .withMessage('Name is required')
    .bail()
    .notEmpty()
    .withMessage('Name cannot be empty')
    .bail()
    .isLength({ min: 1, max: 50 })
    .withMessage('Name must be between 1 and 50 characters'),

  check('dependents.*.lastName')
    .exists()
    .withMessage('LastName is required')
    .bail()
    .notEmpty()
    .withMessage('LastName cannot be empty')
    .bail()
    .isLength({ min: 1, max: 50 })
    .withMessage('LastName must be between 1 and 50 characters'),

  check('dependents.*.secondLastName')
    .exists()
    .withMessage('SecondLastName is required')
    .bail()
    .notEmpty()
    .withMessage('SecondLastName cannot be empty')
    .bail()
    .isLength({ min: 1, max: 50 })
    .withMessage('SecondLastName must be between 1 and 50 characters'),

  check('dependents.*.mobile')
    .exists()
    .withMessage('Mobile is required')
    .bail()
    .notEmpty()
    .withMessage('Mobile cannot be empty')
    .bail()
    .isLength({ min: 10, max: 15 })
    .withMessage('Mobile must be between 10 and 15 characters'),

  check('dependents.*.birthdate')
    .exists()
    .withMessage('Birthdate is required')
    .bail()
    .isISO8601()
    .withMessage('Birthdate must be valid date'),

  check('dependents.*.relationshipId')
    .exists()
    .withMessage('RelationshipId is required')
    .bail()
    .isInt()
    .withMessage('RelationshipId must be integer'),
  check('dependents.*.isFamilyHead')
    .exists()
    .withMessage('isFamilyHead is required')
    .bail()
    .isBoolean()
    .withMessage('isFamilyHead must be boolean'),
];

exports.DependentValidation = (req, res, next) => {
  valid.handleValidation(req, res, next);
};
