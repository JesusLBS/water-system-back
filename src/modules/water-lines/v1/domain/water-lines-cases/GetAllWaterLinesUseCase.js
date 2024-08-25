const { WaterLine } = require('../entities/water-line');

class GetAllWaterLinesUseCase {
  constructor(waterLinesRepository) {
    this.waterLinesRepository = waterLinesRepository;
  }

  async execute() {
    const rows = await this.waterLinesRepository.index();

    const rowsUpdate = rows.map((value) => this.mapDataEntity(value));

    return { rows: rowsUpdate };
  }

  mapDataEntity(value) {
    const { id, name } = value;
    return new WaterLine(id, name);
  }
}

module.exports = GetAllWaterLinesUseCase;
