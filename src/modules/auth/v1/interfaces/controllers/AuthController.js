const ResponseHelper = require("../../../../../helpers/response/responseHelper");
const AuthenticateUserUseCase = require("../../domain/authcases/AuthenticateUserUseCase");
const UserRepositoryImpl = require("../../infraestructure/data/UserRepositoryImpl");

class AuthController {
  #response;

  constructor() {
    this.#response = new ResponseHelper();
    this.userRepository = new UserRepositoryImpl();
    this.authenticateUserUseCase = new AuthenticateUserUseCase(
      this.userRepository,
    );
  }

  login = async (req, res) => {
    try {
      const { uid } = req.body;
      const data = await this.authenticateUserUseCase.execute(uid);
      return this.#response.success({ res, data });
    } catch (error) {
      return this.#response.error(res, error);
    }
  };
}

module.exports = AuthController;
