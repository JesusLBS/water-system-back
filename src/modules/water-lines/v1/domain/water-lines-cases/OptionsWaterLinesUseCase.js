const { WaterLine } = require('../entities/water-line');

class OptionslWaterLinesUseCase {
  constructor(waterLinesRepository) {
    this.waterLinesRepository = waterLinesRepository;
  }

  async execute() {
    const rows = await this.waterLinesRepository.options();

    const rowsUpdate = rows.map((value) => this.mapDataEntity(value));

    return { rows: rowsUpdate };
  }

  mapDataEntity(value) {
    const { id, name } = value;
    return new WaterLine(id, name).toResponse();
  }
}

module.exports = OptionslWaterLinesUseCase;
