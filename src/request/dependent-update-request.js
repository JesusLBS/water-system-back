const { check } = require('express-validator');
const ValidateHelper = require('../helpers/validation/validateHelper');

const valid = new ValidateHelper();

exports.DependentUpdateRequest = [
  check('name').optional().isLength({ min: 1, max: 50 }).withMessage('Name must be between 1 and 50 characters'),

  check('lastName')
    .optional()
    .isLength({ min: 1, max: 50 })
    .withMessage('LastName must be between 1 and 50 characters'),

  check('secondLastName')
    .optional()
    .isLength({ min: 1, max: 50 })
    .withMessage('SecondLastName must be between 1 and 50 characters'),

  check('mobile').optional().isLength({ min: 10, max: 15 }).withMessage('Mobile must be between 10 and 15 characters'),

  check('birthdate').optional().isISO8601().withMessage('Birthdate must be valid date'),

  check('relationshipId')
    .exists()
    .withMessage('RelationshipId is required')
    .bail()
    .isInt()
    .withMessage('RelationshipId must be integer'),

  check('isFamilyHead').optional().isBoolean().withMessage('isFamilyHead must be boolean'),
];

exports.DependentUpdateValidation = (req, res, next) => {
  valid.handleValidation(req, res, next);
};
