const db = require('../../../../../database/models/index');
const AdressRepository = require('../../domain/repositories/AdressRepository');

class AdressRepositoryImpl extends AdressRepository {
  async store(body, options = {}) {
    const transaction = options.transaction;
    const data = await db.Address.create(body, { transaction });
    if (!data) return null;
    return data;
  }
}

module.exports = AdressRepositoryImpl;
