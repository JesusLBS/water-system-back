const db = require('../../../../../database/models');

class CreateSocioUseCase {
  constructor(socioRepository, userRepository, addressRepository, profileRepository) {
    this.socioRepository = socioRepository;
    this.userRepository = userRepository;
    this.addressRepository = addressRepository;
    this.profileRepository = profileRepository;
  }

  async execute(data) {
    const transaction = await db.sequelize.transaction();
    try {
      const { roleId: catRoleId, ...userDataRest } = data.userData;
      const userData = { catRoleId, ...userDataRest };
      const addressData = { ...data.addressData, country: 'México' };
      const profileData = { ...data.profileData };

      const [user, address] = await Promise.all([
        this.userRepository.store(userData, { transaction }),
        this.addressRepository.store(addressData, { transaction }),
      ]);

      await Promise.all([
        this.profileRepository.store(
          {
            ...profileData,
            userId: user.id,
            addressId: address.id,
          },
          { transaction }
        ),
        this.socioRepository.store({ userId: user.id }, { transaction }),
      ]);

      await transaction.commit();
      return { socioUid: user.uid };
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
}

module.exports = CreateSocioUseCase;
