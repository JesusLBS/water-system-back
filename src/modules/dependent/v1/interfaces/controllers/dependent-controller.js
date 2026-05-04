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

  indexBySocio = async (req, res) => {
    try {
      const uid = req.params.socioUid;
      const params = {
        search: req.query.search,
        sort: req.query.sort,
        direction: req.query.direction,
        page: req.query.page ? Number(req.query.page) : undefined,
        limit: req.query.limit ? Number(req.query.limit) : undefined,
        withTrashed: req.query.withTrashed,
      };
      const data = await this.dependentUseCases.getDependentsPerSocio.execute({ uid, params });

      return this.#response.success({ res, data });
    } catch (error) {
      return this.#response.error(res, error);
    }
  };

  store = async (req, res) => {
    try {
      const { socioUid } = req.params;
      const body = req.body;

      await this.dependentUseCases.createDependent.execute({
        socioUid,
        ...body,
      });

      return this.#response.success({ res, status: 201 });
    } catch (error) {
      return this.#response.error(res, error);
    }
  };

  show = async (req, res) => {
    try {
      const { socioUid, dependentId } = req.params;

      const data = await this.dependentUseCases.showDependent.execute({
        socioUid,
        dependentId,
      });

      return this.#response.success({
        res,
        data: data.toResponse(),
      });
    } catch (error) {
      return this.#response.error(res, error);
    }
  };

  update = async (req, res) => {
    try {
      const { socioUid, dependentId } = req.params;
      const body = req.body;

      await this.dependentUseCases.updateDependent.execute({
        socioUid,
        dependentId,
        dependent: body,
      });

      return this.#response.success({ res });
    } catch (error) {
      return this.#response.error(res, error);
    }
  };

  destroy = async (req, res) => {
    try {
      const { socioUid, dependentId } = req.params;

      await this.dependentUseCases.destroyDependent.execute({ dependentId, socioUid });
      return this.#response.destroy(res);
    } catch (error) {
      return this.#response.error(res, error);
    }
  };
}

module.exports = DependentController;
