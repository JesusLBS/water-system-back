const ResponseHelper = require('../../../../../helpers/response/responseHelper');
const DependentUseCases = require('../../domain/dependents-cases/dependent-use-case');
const DependentRepositoryImpl = require('../../infraestructure/data/dependent-repository-impl');
const SocioRepositoryImpl = require('../../infraestructure/data/socio-repository-impl');

class DependentController {
  #response;

  constructor() {
    this.#response = new ResponseHelper();
    this.dependentRepository = new DependentRepositoryImpl();
    this.socioRepository = new SocioRepositoryImpl();
    this.dependentUseCases = new DependentUseCases(this.dependentRepository, this.socioRepository);
  }

  store = async (req, res) => {
    try {
      const body = req.body;

      await this.dependentUseCases.createDependent.execute(body);
      return this.#response.success({ res, status: 201 });
    } catch (error) {
      return this.#response.error(res, error);
    }
  };

  getDependentsPerSocio = async (req, res) => {
    try {
      const uid = req.params.dataId;

      const data = await this.dependentUseCases.getDependentsPerSocio.execute(uid);

      return this.#response.success({ res, data });
    } catch (error) {
      return this.#response.error(res, error);
    }
  };

  show = async (req, res) => {
    try {
      const dependentId = req.params.dataId;

      const data = await this.dependentUseCases.showDependent.execute(dependentId);

      return this.#response.success({ res, data });
    } catch (error) {
      return this.#response.error(res, error);
    }
  };

  update = async (req, res) => {
    try {
      const body = req.body;

      await this.dependentUseCases.updateDependent.execute(body);

      return this.#response.success({ res });
    } catch (error) {
      return this.#response.error(res, error);
    }
  };

  destroy = async (req, res) => {
    try {
      const dependentId = req.params.dataId;
      const socioUid = req.params.socioUid;

      await this.dependentUseCases.destroyDependent.execute({ dependentId, socioUid });
      return this.#response.destroy(res);
    } catch (error) {
      return this.#response.error(res, error);
    }
  };
}

module.exports = DependentController;
