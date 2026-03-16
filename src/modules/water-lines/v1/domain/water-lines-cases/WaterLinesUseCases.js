const GetAllWaterLinesUseCase = require('./GetAllWaterLinesUseCase');
const OptionslWaterLinesUseCase = require('./OptionsWaterLinesUseCase');
const ShowWaterLineUseCase = require('./ShowWaterLineCase');

class WaterLinesUseCases {
  constructor(waterLinesRepository) {
    this.getAllWaterLines = new GetAllWaterLinesUseCase(waterLinesRepository);
    this.optionslWaterLines = new OptionslWaterLinesUseCase(waterLinesRepository);
    this.showWaterLine = new ShowWaterLineUseCase(waterLinesRepository);
  }
}

module.exports = WaterLinesUseCases;
