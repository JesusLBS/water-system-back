const db = require('../../../../../database/models');

class DeactivateSocioUseCase {
  constructor(socioRepository) {
    this.socioRepository = socioRepository;
  }

  async execute(data) {
    const transaction = await db.sequelize.transaction();
    try {
      const row = await this.socioRepository.deactivate(data, {
        transaction,
      });

      if (!row) {
        throw { statusCode: 404, message: 'Data not found' };
      }

      await transaction.commit();
      return row;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
}

module.exports = DeactivateSocioUseCase;
