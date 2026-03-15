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
      const params = {
        search: req.query.search,
        sort: req.query.sort,
        direction: req.query.direction,
        page: req.query.page ? Number(req.query.page) : undefined,
        limit: req.query.limit ? Number(req.query.limit) : undefined,
        withTrashed: req.query.withTrashed,
      };

      const data = await this.waterLineUseCases.getAllWaterLines.execute(params);

      return this.#response.success({ res, data });
    } catch (error) {
      return this.#response.error(res, error);
    }
  };

  options = async (req, res) => {
    try {
      const data = await this.waterLineUseCases.optionslWaterLines.execute();

      return this.#response.success({ res, data });
    } catch (error) {
      return this.#response.error(res, error);
    }
  };

  store = async (req, res) => {
    try {
      const body = req.body;

      const data = await this.waterLineUseCases.createWaterLine.execute(body);

      return this.#response.success({ res, status: 201, data });
    } catch (error) {
      return this.#response.error(res, error);
    }
  };

  show = async (req, res) => {
    try {
      const uid = req.params.dataId;

      const data = await this.waterLineUseCases.showWaterLine.execute(uid);

      return this.#response.success({ res, data });
    } catch (error) {
      return this.#response.error(res, error);
    }
  };

  update = async (req, res) => {
    try {
      const body = req.body;

      await this.waterLineUseCases.updateWaterLine.execute(body);

      return this.#response.success({ res });
    } catch (error) {
      return this.#response.error(res, error);
    }
  };

  deactivate = async (req, res) => {
    try {
      const uid = req.body.dataId;

      const data = await this.waterLineUseCases.deactivateWaterLine.execute(uid);

      return this.#response.success({ res, data });
    } catch (error) {
      return this.#response.error(res, error);
    }
  };

  activate = async (req, res) => {
    try {
      const uid = req.body.dataId;

      const data = await this.waterLineUseCases.activateWaterLine.execute(uid);

      return this.#response.success({ res, data });
    } catch (error) {
      return this.#response.error(res, error);
    }
  };

  destroy = async (req, res) => {
    try {
      const uid = req.params.dataId;

      await this.waterLineUseCases.destroyWaterLine.execute(uid);

      return this.#response.destroy(res);
    } catch (error) {
      return this.#response.error(res, error);
    }
  };
}

module.exports = WaterLineController;
