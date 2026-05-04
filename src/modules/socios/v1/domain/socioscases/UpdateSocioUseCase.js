const db = require('../../../../../database/models');

class UpdateSocioUseCase {
  constructor(userRepository, profileRepository) {
    this.userRepository = userRepository;
    this.profileRepository = profileRepository;
  }

  async execute(data) {
    const transaction = await db.sequelize.transaction();
    try {
      const { ...userDataRest } = data.userData;
      const userData = { ...userDataRest };
      const addressData = { ...data.addressData };
      const profileData = { ...data.profileData };

      const user = await this.userRepository.update(userData, { transaction });

      await this.profileRepository.update(
        {
          profileData: { ...profileData },
          addressData: { ...addressData },
          userId: user.id,
        },
        { transaction }
      );

      await transaction.commit();
      return true;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
}

module.exports = UpdateSocioUseCase;
