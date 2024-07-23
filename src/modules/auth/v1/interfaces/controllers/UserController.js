const ResponseHelper = require("../../../../../helpers/response/responseHelper");

class UserController {
    response

    constructor() {
        this.response = new ResponseHelper();
    }

    login = async (req, res) => {
        try {
            return this.response.success(res);
        } catch (error) {
            return this.response.error(res, error);
        }
    }
}

module.exports = UserController;
