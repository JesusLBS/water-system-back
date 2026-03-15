const GetAllWaterLinesUseCase = require('./GetAllWaterLinesUseCase');
const OptionslWaterLinesUseCase = require('./OptionsWaterLinesUseCase');

class WaterLinesUseCases {
  constructor(waterLinesRepository) {
    this.getAllWaterLines = new GetAllWaterLinesUseCase(waterLinesRepository);
    this.optionslWaterLines = new OptionslWaterLinesUseCase(waterLinesRepository);
  }
}

module.exports = WaterLinesUseCases;
