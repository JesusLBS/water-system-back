const ResponseHelper = require('../../../../../helpers/response/responseHelper');
const UserRepositoryImpl = require('../../../../users/v1/infraestructure/data/UserRepositoryImpl');
const SocioUseCases = require('../../domain/socioscases/SocioUseCases');
const AdressRepositoryImpl = require('../../infraestructure/data/AdressRepositryImpl');
const ProfileRepositoryImpl = require('../../infraestructure/data/ProfileRepositoryImpl');
const SocioRepositoryImpl = require('../../infraestructure/data/SocioRepositoryImpl');

class SocioController {
  #response;

  constructor() {
    this.#response = new ResponseHelper();
    this.socioRepository = new SocioRepositoryImpl();
    this.userRepository = new UserRepositoryImpl();
    this.addressRepository = new AdressRepositoryImpl();
    this.profileRepository = new ProfileRepositoryImpl();
    this.socioUseCases = new SocioUseCases(
      this.socioRepository,
      this.userRepository,
      this.addressRepository,
      this.profileRepository
    );
  }

  index = async (req, res) => {
    try {
      const params = {
        search: req.params.search,
        sort: req.params.sort,
        direction: req.params.direction,
        page: req.params.page,
        limit: req.params.limit,
        withTrashed: req.params.withTrashed,
      };

      const data = await this.socioUseCases.getAllSocio.execute(params);

      return this.#response.success({ res, data });
    } catch (error) {
      return this.#response.error(res, error);
    }
  };

  store = async (req, res) => {
    try {
      const body = req.body;

      const data = await this.socioUseCases.createSocio.execute(body);
      return this.#response.success({ res, status: 201, data });
    } catch (error) {
      return this.#response.error(res, error);
    }
  };

  show = async (req, res) => {
    try {
      const uid = req.params.dataId;

      const data = await this.socioUseCases.showSocio.execute(uid);

      return this.#response.success({ res, data });
    } catch (error) {
      return this.#response.error(res, error);
    }
  };

  update = async (req, res) => {
    try {
      const body = req.body;

      await this.socioUseCases.updateSocio.execute(body);

      return this.#response.success({ res });
    } catch (error) {
      return this.#response.error(res, error);
    }
  };

  deactivate = async (req, res) => {
    try {
      const uid = req.body.dataId;
      const data = await this.socioUseCases.deactivateSocio.execute(uid);
      return this.#response.success({ res, data });
    } catch (error) {
      return this.#response.error(res, error);
    }
  };

  activate = async (req, res) => {
    try {
      const uid = req.body.dataId;
      const data = await this.socioUseCases.activateSocio.execute(uid);
      return this.#response.success({ res, data });
    } catch (error) {
      return this.#response.error(res, error);
    }
  };

  destroy = async (req, res) => {
    try {
      const uid = req.params.dataId;

      await this.socioUseCases.destroySocio.execute(uid);
      return this.#response.destroy(res);
    } catch (error) {
      return this.#response.error(res, error);
    }
  };
}

module.exports = SocioController;
