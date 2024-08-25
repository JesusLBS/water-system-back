const db = require('../../../../../database/models/index');
const WaterLineRepository = require('../../domain/repositories/WaterLinesRepository');

class WaterLinesRepositoryImpl extends WaterLineRepository {
  async index() {
    const rows = await db.WaterLine.scope('raw').findAll({
      attributes: ['id', 'name'],
      order: [['name', 'asc']],
      paranoid: true,
    });

    return rows;
  }
}

module.exports = WaterLinesRepositoryImpl;
