const db = require("../../../../../database/models");

class ActivateUserUseCase {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute(userData) {
    const transaction = await db.sequelize.transaction();
    try {
      const result = await this.userRepository.activate(userData, {
        transaction,
      });

      if (!result) {
        throw { statusCode: 404, message: "Data not found" };
      }

      await transaction.commit();
      return result;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
}

module.exports = ActivateUserUseCase;
