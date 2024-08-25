const ResponseHelper = require('../../../../../helpers/response/responseHelper');
const WaterLinesUseCases = require('../../domain/water-lines-cases/WaterLinesUseCases');
const WaterLinesRepositoryImpl = require('../../infraestructure/data/WaterlinesRepositoryImpl');

class WaterLineController {
  #response;

  constructor() {
    this.#response = new ResponseHelper();
    this.waterLinesRepository = new WaterLinesRepositoryImpl();
    this.waterLineUseCases = new WaterLinesUseCases(this.waterLinesRepository);
  }

  index = async (req, res) => {
    try {
      const data = await this.waterLineUseCases.getAllWaterLines.execute();

      return this.#response.success({ res, data });
    } catch (error) {
      return this.#response.error(res, error);
    }
  };
}

module.exports = WaterLineController;
