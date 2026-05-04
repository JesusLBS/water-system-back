const db = require('../../../../../database/models/index');
const WaterTakeRepository = require('../../domain/repositories/water-take-repository');

class WaterTakesRepositoryImpl extends WaterTakeRepository {
  async store(body, options = {}) {
    const transaction = options.transaction;
    const row = await db.WaterTake.create(body, { transaction });
    if (!row) return null;
    return row;
  }

  async deactivate(id, options = {}) {
    const transaction = options.transaction;

    const row = await db.WaterTake.findByPk(id, { transaction });
    if (!row) return null;

    await row.destroy({ transaction });
    return row;
  }

  async restore(id, options = {}) {
    const transaction = options.transaction;

    const row = await db.WaterTake.findByPk(id, {
      paranoid: false, // include soft deleted
      transaction,
    });

    if (!row) return null;

    await row.restore({ transaction });
    return row;
  }
}

module.exports = WaterTakesRepositoryImpl;
