const ResponseHelper = require('../../../../../helpers/response/responseHelper');
const WaterTakesUseCases = require('../../domain/water-takes-cases/water-take-use-case');
const WaterTakesRepositoryImpl = require('../../infraestructure/data/water-take-repository-impl');

class WaterTakeController {
  #response;

  constructor() {
    this.#response = new ResponseHelper();
    this.waterLinesRepository = new WaterTakesRepositoryImpl();
    this.waterLineUseCases = new WaterTakesUseCases(this.waterLinesRepository);
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
}

module.exports = WaterTakeController;
