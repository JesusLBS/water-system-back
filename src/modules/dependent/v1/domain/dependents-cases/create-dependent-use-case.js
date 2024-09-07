const db = require('../../../../../database/models');

class CreateDependentUseCase {
  constructor(dependentRepository, socioRepository) {
    this.dependentRepository = dependentRepository;
    this.socioRepository = socioRepository;
  }

  async execute(data) {
    const transaction = await db.sequelize.transaction();
    try {
      const { socioUid, dependents } = data;
      let increment = 0;
      const row = await this.socioRepository.findSocioByUserUid(socioUid);

      if (!row) {
        throw { statusCode: 404, message: 'Data not found' };
      }
      const { id: socioId } = row;

      for (const dependent of dependents) {
        const { relationshipId, ...rest } = dependent;
        const body = {
          socioId,
          ...rest,
          catRelationshipId: relationshipId,
        };
        const row = await this.dependentRepository.store(body, { transaction });
        if (row.id) {
          increment++;
        }
      }

      const isIncrement = await this.socioRepository.incrementeSocioByUserUid(socioUid, increment, { transaction });
      if (!isIncrement) {
        throw { statusCode: 404, message: 'Data not found' };
      }

      await transaction.commit();
      return true;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
}

module.exports = CreateDependentUseCase;
