const db = require('../../../../../database/models');

class UpdateDependentUseCase {
  constructor(dependentRepository, socioRepository) {
    this.dependentRepository = dependentRepository;
    this.socioRepository = socioRepository;
  }

  async execute({ socioUid, dependentId, dependent }) {
    const transaction = await db.sequelize.transaction();

    try {
      const socio = await this.socioRepository.findSocioByUserUid(socioUid);

      if (!socio) {
        throw { statusCode: 404, message: 'Data not found' };
      }

      const existing = await this.dependentRepository.findById(dependentId, socio.id);

      if (!existing) {
        throw { statusCode: 404, message: 'Data not found' };
      }

      const { relationshipId, ...rest } = dependent;

      const body = {
        id: dependentId,
        catRelationshipId: relationshipId,
        ...rest,
      };

      await this.dependentRepository.update(body, { transaction });

      await transaction.commit();
      return true;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
}

module.exports = UpdateDependentUseCase;
