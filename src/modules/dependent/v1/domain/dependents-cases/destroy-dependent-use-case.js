const db = require('../../../../../database/models');

class DestroyDependentUseCase {
  constructor(dependentRepository, socioRepository) {
    this.dependentRepository = dependentRepository;
    this.socioRepository = socioRepository;
  }

  async execute(data) {
    const transaction = await db.sequelize.transaction();
    try {
      const { dependentId, socioUid } = data;
      const row = await this.dependentRepository.destroy(dependentId, {
        transaction,
      });

      if (!row) {
        throw { statusCode: 404, message: 'Data not found' };
      }

      const isIncrement = await this.socioRepository.incrementeSocioByUserUid(socioUid, -1, { transaction });
      if (!isIncrement) {
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

module.exports = DestroyDependentUseCase;
