const db = require('../../../../../database/models/index');
const WaterTakeRepository = require('../../domain/repositories/water-take-repository');

class WaterTakesRepositoryImpl extends WaterTakeRepository {
  async store(body, options = {}) {
    const transaction = options.transaction;
    const row = await db.WaterTake.create(body, { transaction });
    if (!row) return null;
    return row;
  }
}

module.exports = WaterTakesRepositoryImpl;
