class AssignWaterLineUseCase {
  constructor(waterTakesRepository) {
    this.waterTakesRepository = waterTakesRepository;
  }

  async execute(body) {
    if (!body?.socioId || !body?.waterLineId) {
      throw { statusCode: 400, message: 'socioId and waterLineId are required' };
    }

    try {
      const waterTake = await this.waterTakesRepository.store({
        socioId: body.socioId,
        waterLineId: body.waterLineId,
      });

      if (!waterTake) {
        throw { statusCode: 500, message: 'WaterTake could not be created' };
      }

      return waterTake;
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        throw {
          statusCode: 409,
          message: 'Socio already has a water line assigned',
        };
      }

      throw error;
    }
  }
}

module.exports = AssignWaterLineUseCase;
