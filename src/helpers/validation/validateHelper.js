const { validationResult } = require('express-validator');
const ResponseHelper = require('../response/responseHelper');

class ValidateHelper {
  constructor() {
    this.response = new ResponseHelper();
  }

  handleValidation = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return this.response.error(res, errors.array(), 400);
    }

    next();
  };
}

module.exports = ValidateHelper;
