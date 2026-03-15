const { Op } = require('sequelize');
const db = require('../../../../../database/models/index');
const WaterLineRepository = require('../../domain/repositories/WaterLinesRepository');

class WaterLinesRepositoryImpl extends WaterLineRepository {
  async index({ options, where }) {
    const { limit, page, sort, direction } = options;

    const { count, rows } = await db.WaterLine.scope('raw').findAndCountAll({
      where,
      order: [[sort, direction]],
      offset: (page - 1) * limit,
      limit,
      paranoid: false,
      distinct: true,
    });

    return { count, rows };
  }

  async countAll() {
    return await db.WaterLine.count({
      paranoid: false,
      distinct: true,
    });
  }

  async countByStatus() {
    const [active, inactive] = await Promise.all([
      db.WaterLine.count({
        where: { deletedAt: null },
        paranoid: false,
        distinct: true,
      }),
      db.WaterLine.count({
        where: { deletedAt: { [Op.ne]: null } },
        paranoid: false,
        distinct: true,
      }),
    ]);

    return { active, inactive };
  }

  async options() {
    const rows = await db.WaterLine.scope('raw').findAll({
      attributes: ['id', 'name'],
      order: [['name', 'asc']],
      paranoid: true,
    });

    return rows;
  }
}

module.exports = WaterLinesRepositoryImpl;
