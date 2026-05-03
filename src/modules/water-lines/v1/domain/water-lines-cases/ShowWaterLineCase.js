const TimeUtil = require('../../../../../utils/TimeUtil');
const { WaterLineShow } = require('../entities/water-line');
const timeUtil = new TimeUtil('es-MX');

class ShowWaterLineUseCase {
  constructor(waterLinesRepository) {
    this.waterLinesRepository = waterLinesRepository;
  }

  async execute(id) {
    const row = await this.waterLinesRepository.edit(id);

    if (!row) {
      throw { statusCode: 404, message: 'Data not found' };
    }

    const waterLine = new WaterLineShow({
      id: row.id,
      name: row.name,
      status: row.deletedAt ? 'inactive' : 'active',
      waterTakesCount: Number(row.waterTakesCount || 0),
      createdAt: timeUtil.transformTime(row.createdAt),
      updatedAt: timeUtil.transformTime(row.updatedAt),
      deletedAt: timeUtil.transformTime(row.deletedAt),
    });

    return waterLine.toResponse();
  }
}

module.exports = ShowWaterLineUseCase;
