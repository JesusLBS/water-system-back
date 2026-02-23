const AssignWaterLineUseCase = require('./AssignWaterLineUseCase');

class WaterTakesUseCases {
  constructor(waterTakesRepository) {
    this.assignWaterLineUseCase = new AssignWaterLineUseCase(waterTakesRepository);
  }
}

module.exports = WaterTakesUseCases;
