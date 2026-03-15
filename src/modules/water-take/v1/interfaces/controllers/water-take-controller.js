const ResponseHelper = require('../../../../../helpers/response/responseHelper');
const SocioRepositoryImpl = require('../../../../socios/v1/infraestructure/data/SocioRepositoryImpl');
const UserRepositoryImpl = require('../../../../users/v1/infraestructure/data/UserRepositoryImpl');
const WaterTakesUseCases = require('../../domain/water-takes-cases/water-take-use-case');
const WaterTakesRepositoryImpl = require('../../infraestructure/data/water-take-repository-impl');

class WaterTakeController {
  #response;

  constructor() {
    this.#response = new ResponseHelper();
    const usersRepository = new UserRepositoryImpl();
    const sociosRepository = new SocioRepositoryImpl();
    const waterTakesRepository = new WaterTakesRepositoryImpl();

    this.waterLineUseCases = new WaterTakesUseCases({
      waterTakesRepository,
      usersRepository,
      sociosRepository,
    });
  }

  store = async (req, res) => {
    try {
      const body = req.body;
      await this.waterLineUseCases.assignWaterLineUseCase.execute(body);

      return this.#response.success({ res, status: 201 });
    } catch (error) {
      return this.#response.error(res, error);
    }
  };

  deactivate = async (req, res) => {
    try {
      const { id } = req.params;

      await this.waterLineUseCases.deactivateWaterTakeUseCase.execute(id);

      return this.#response.success({ res });
    } catch (error) {
      return this.#response.error(res, error);
    }
  };

  restore = async (req, res) => {
    try {
      const { id } = req.params;

      await this.waterLineUseCases.restoreWaterTakeUseCase.execute(id);

      return this.#response.success({ res });
    } catch (error) {
      return this.#response.error(res, error);
    }
  };
}

module.exports = WaterTakeController;
