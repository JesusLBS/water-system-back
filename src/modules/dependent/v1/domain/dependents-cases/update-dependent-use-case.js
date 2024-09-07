const db = require('../../../../../database/models');

class UpdateDependentUseCase {
  constructor(dependentRepository, socioRepository) {
    this.dependentRepository = dependentRepository;
    this.socioRepository = socioRepository;
  }

  async execute(data) {
    const transaction = await db.sequelize.transaction();
    try {
      const {
        dataId,
        dependent: { relationshipId, ...rest },
      } = data;
      const body = {
        id: dataId,
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
