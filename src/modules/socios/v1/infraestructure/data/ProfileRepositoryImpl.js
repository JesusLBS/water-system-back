const db = require('../../../../../database/models/index');
const ProfileRepository = require('../../domain/repositories/ProfileRepository');

class ProfileRepositoryImpl extends ProfileRepository {
  async store(body, options = {}) {
    const transaction = options.transaction;
    const data = await db.Profile.create(body, { transaction });
    if (!data) return null;
    return data;
  }

  async update(body, options = {}) {
    const transaction = options.transaction;
    const { userId, addressData, profileData } = body;

    const data = await db.Profile.findOne({
      where: { userId },
      include: [
        {
          model: db.Address,
          required: true,
        },
      ],
      transaction,
    });

    if (!data) return null;

    await data.update(profileData, { transaction });

    await data.Address.update(addressData, { transaction });
    return data;
  }
}

module.exports = ProfileRepositoryImpl;
