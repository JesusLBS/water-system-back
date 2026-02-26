class DeactivateWaterTakeUseCase {
  constructor(waterTakesRepository) {
    this.waterTakesRepository = waterTakesRepository;
  }

  async execute(id) {
    if (!id) {
      throw { statusCode: 400, message: 'id is required' };
    }

    const waterTake = await this.waterTakesRepository.deactivate(id);

    if (!waterTake) {
      throw { statusCode: 404, message: 'WaterTake not found' };
    }

    return waterTake;
  }
}

module.exports = DeactivateWaterTakeUseCase;
