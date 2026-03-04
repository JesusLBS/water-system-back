const db = require('../../../../../database/models');

class CreateDependentUseCase {
  constructor(dependentRepository, socioRepository) {
    this.dependentRepository = dependentRepository;
    this.socioRepository = socioRepository;
  }

  async execute({ socioUid, dependents }) {
    const transaction = await db.sequelize.transaction();

    try {
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

        const created = await this.dependentRepository.store(body, { transaction });

        if (created?.id) increment++;
      }

      const updated = await this.socioRepository.incrementeSocioByUserUid(socioUid, increment, { transaction });

      if (!updated) {
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
