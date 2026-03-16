const express = require('express');
const { param } = require('express-validator');

const router = express.Router();
const WaterLineController = require('../../interfaces/controllers/water-linescontroller');
const ValidateHelper = require('../../../../../helpers/validation/validateHelper');
const controller = new WaterLineController();

const valid = new ValidateHelper();

router
  .get('/', controller.index)
  .get('/options', controller.options)
  .get(
    '/:dataId',
    [
      param('dataId')
        .exists()
        .withMessage('dataId is required')
        .notEmpty()
        .withMessage('dataId cannot be empty')
        .isInt()
        .withMessage('dataId must be an integer'),
    ],
    (req, res, next) => valid.handleValidation(req, res, next),
    controller.show
  );

module.exports = router;
