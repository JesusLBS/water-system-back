const { Op, Sequelize } = require('sequelize');
const db = require('../../../../../database/models/index');
const WaterLineRepository = require('../../domain/repositories/WaterLinesRepository');

class WaterLinesRepositoryImpl extends WaterLineRepository {
  async index({ options, where }) {
    const { limit, page, sort, direction } = options;

    const { count, rows } = await db.WaterLine.scope('raw').findAndCountAll({
      where,
      attributes: ['id', 'name', 'createdAt', 'updatedAt', 'deletedAt'],
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
      }),
      db.WaterLine.count({
        where: { deletedAt: { [Op.ne]: null } },
        paranoid: false,
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

  async store(body, options = {}) {
    const transaction = options.transaction;

    const row = await db.WaterLine.create(body, { transaction });

    if (!row) return null;

    return row.toJSON();
  }

  async edit(id) {
    const row = await db.WaterLine.scope('raw').findOne({
      where: { id },
      attributes: [
        'id',
        'name',
        'createdAt',
        'updatedAt',
        'deletedAt',
        [Sequelize.fn('COUNT', Sequelize.fn('DISTINCT', Sequelize.col('WaterTakes.id'))), 'waterTakesCount'],
      ],
      include: [
        {
          model: db.WaterTake,
          as: 'WaterTakes',
          attributes: [],
          required: false,
          paranoid: false,
        },
      ],
      group: ['WaterLine.id'],
      paranoid: false,
    });

    return row;
  }

  async update(body, options = {}) {
    const transaction = options.transaction;

    const { id, ...rest } = body;

    const row = await db.WaterLine.findOne({
      where: { id },
      transaction,
    });

    if (!row) return null;

    await row.update({ ...rest }, { transaction });

    return row.toJSON();
  }

  async destroy(id, options = {}) {
    const transaction = options.transaction;

    const row = await db.WaterLine.findOne({
      where: { id },
      paranoid: false,
      transaction,
    });

    if (!row) return null;

    await row.destroy({ force: true, transaction });

    return true;
  }

  async deactivate(id, options = {}) {
    const transaction = options.transaction;

    const row = await db.WaterLine.findOne({
      where: { id },
      transaction,
    });

    if (!row) return null;

    await row.destroy({ transaction });

    return true;
  }

  async activate(id, options = {}) {
    const transaction = options.transaction;

    const row = await db.WaterLine.findOne({
      where: { id },
      paranoid: false,
      transaction,
    });

    if (!row) return null;

    await row.restore({ transaction });

    return true;
  }
}

module.exports = WaterLinesRepositoryImpl;
