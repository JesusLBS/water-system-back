const TimeUtil = require('../../../../../utils/TimeUtil');
const { Dependent } = require('../entities/dependent-entity');

const timeUtil = new TimeUtil('es-MX');

class GetDependentsPerSocio {
  constructor(dependentRepository) {
    this.dependentRepository = dependentRepository;
  }

  async execute(data) {
    const { count, rows } = await this.dependentRepository.getAllDependents(data);
    if (!rows) {
      throw { statusCode: 404, message: 'Data not found' };
    }

    const rowsUpdate = rows.map((value) => this.mapDataEntity(value));

    return { count, rows: rowsUpdate };
  }

  mapDataEntity(value) {
    const { id, name, lastName, secondLastName, ...rest } = value;

    const fullName = `${name} ${lastName} ${secondLastName}`;

    const transformedDates = {
      createdAt: timeUtil.transformTime(rest.createdAt),
      updatedAt: timeUtil.transformTime(rest.updatedAt),
      deletedAt: timeUtil.transformTime(rest.deletedAt),
    };

    return new Dependent(id, fullName, ...Object.values(transformedDates));
  }
}

module.exports = GetDependentsPerSocio;
