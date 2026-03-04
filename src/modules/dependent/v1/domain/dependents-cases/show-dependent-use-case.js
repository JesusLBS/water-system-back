const TimeUtil = require('../../../../../utils/TimeUtil');
const { DependentShow } = require('../entities/dependent-entity');

const timeUtil = new TimeUtil('es-MX');

class ShowDependentUseCase {
  constructor(dependentRepository, socioRepository) {
    this.dependentRepository = dependentRepository;
    this.socioRepository = socioRepository;
  }

  async execute({ socioUid, dependentId }) {
    const socio = await this.socioRepository.findSocioByUserUid(socioUid);
    if (!socio) throw { statusCode: 404, message: 'Data not found 01' };

    const row = await this.dependentRepository.findById(dependentId, socio.id);
    if (!row) throw { statusCode: 404, message: 'Data not found 02' };

    const age = timeUtil.getAge(row.birthdate);

    return new DependentShow({ ...row, age });
  }
}

module.exports = ShowDependentUseCase;
