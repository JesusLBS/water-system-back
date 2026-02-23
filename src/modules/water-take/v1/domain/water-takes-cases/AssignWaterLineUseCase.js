class AssignWaterLineUseCase {
  constructor(waterTakesRepository) {
    this.waterTakesRepository = waterTakesRepository;
  }

  async execute(body) {
    // basic validation
    if (!body?.socioId || !body?.waterLineId) {
      throw new Error('socioId and waterLineId are required');
    }

    // create relation
    const waterTake = await this.waterTakesRepository.store({
      socioId: body.socioId,
      waterLineId: body.waterLineId,
    });

    if (!waterTake) {
      throw new Error('WaterTake could not be created');
    }

    return waterTake;
  }
}

module.exports = AssignWaterLineUseCase;
