const TimeUtil = require('../../../../../utils/TimeUtil');
const { DependentShow } = require('../entities/dependent-entity');

const timeUtil = new TimeUtil('es-MX');

class ShowDependentUseCase {
  constructor(dependentRepository) {
    this.dependentRepository = dependentRepository;
  }

  async execute(data) {
    const row = await this.dependentRepository.edit(data);
    if (!row) {
      throw { statusCode: 404, message: 'Data not found' };
    }
    const age = timeUtil.getAge(row.birthdate);
    return new DependentShow({
      ...row,
      age,
    });
  }
}

module.exports = ShowDependentUseCase;
