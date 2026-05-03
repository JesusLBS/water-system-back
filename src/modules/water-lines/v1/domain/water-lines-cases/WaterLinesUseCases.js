const GetAllWaterLinesUseCase = require('./GetAllWaterLinesUseCase');
const OptionslWaterLinesUseCase = require('./OptionsWaterLinesUseCase');
const ShowWaterLineUseCase = require('./ShowWaterLineCase');

const CreateWaterLineUseCase = require('./CreateWaterLineUseCase');
const UpdateWaterLineUseCase = require('./UpdateWaterLineUseCase');
const DeactivateWaterLineUseCase = require('./DeactivateWaterLineUseCase');
const ActivateWaterLineUseCase = require('./ActivateWaterLineUseCase');
const DestroyWaterLineUseCase = require('./DestroyWaterLineUseCase');
const GetWaterLineWaterTakesUseCase = require('./GetWaterLineWaterTakesUseCase');
class WaterLinesUseCases {
  constructor(waterLinesRepository) {
    this.getAllWaterLines = new GetAllWaterLinesUseCase(waterLinesRepository);
    this.optionslWaterLines = new OptionslWaterLinesUseCase(waterLinesRepository);
    this.showWaterLine = new ShowWaterLineUseCase(waterLinesRepository);

    this.createWaterLine = new CreateWaterLineUseCase(waterLinesRepository);
    this.updateWaterLine = new UpdateWaterLineUseCase(waterLinesRepository);
    this.deactivateWaterLine = new DeactivateWaterLineUseCase(waterLinesRepository);
    this.activateWaterLine = new ActivateWaterLineUseCase(waterLinesRepository);
    this.destroyWaterLine = new DestroyWaterLineUseCase(waterLinesRepository);
    this.getWaterLineWaterTakes = new GetWaterLineWaterTakesUseCase(waterLinesRepository);
  }
}

module.exports = WaterLinesUseCases;
