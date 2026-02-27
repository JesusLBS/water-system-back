const AssignWaterLineUseCase = require('./AssignWaterLineUseCase');
const DeactivateWaterTakeUseCase = require('./DeactivateWaterTakeUseCase');
const RestoreWaterTakeUseCase = require('./RestoreWaterTakeUseCase');

class WaterTakesUseCases {
  constructor({ waterTakesRepository, usersRepository, sociosRepository }) {
    this.assignWaterLineUseCase = new AssignWaterLineUseCase(waterTakesRepository, usersRepository, sociosRepository);

    this.deactivateWaterTakeUseCase = new DeactivateWaterTakeUseCase(waterTakesRepository);

    this.restoreWaterTakeUseCase = new RestoreWaterTakeUseCase(waterTakesRepository);
  }
}

module.exports = WaterTakesUseCases;
