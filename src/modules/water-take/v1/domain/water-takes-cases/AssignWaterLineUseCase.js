class AssignWaterLineUseCase {
  constructor(waterTakesRepository, usersRepository, sociosRepository) {
    this.waterTakesRepository = waterTakesRepository;
    this.usersRepository = usersRepository;
    this.sociosRepository = sociosRepository;
  }

  async execute(body) {
    if (!body?.uid || !body?.waterLineId) {
      throw { statusCode: 400, message: 'uid and waterLineId are required' };
    }

    const user = await this.usersRepository.edit(body.uid);
    if (!user) {
      throw { statusCode: 404, message: 'User not found' };
    }
    const socio = await this.sociosRepository.findByUserId(user.id);
    if (!socio) {
      throw { statusCode: 404, message: 'Socio not found' };
    }

    try {
      const waterTake = await this.waterTakesRepository.store({
        socioId: socio.id,
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
