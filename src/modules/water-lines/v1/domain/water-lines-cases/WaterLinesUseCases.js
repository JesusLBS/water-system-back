const GetAllWaterLinesUseCase = require('./GetAllWaterLinesUseCase');

class WaterLinesUseCases {
  constructor(waterLinesRepository) {
    this.getAllWaterLines = new GetAllWaterLinesUseCase(waterLinesRepository);
  }
}

module.exports = WaterLinesUseCases;
