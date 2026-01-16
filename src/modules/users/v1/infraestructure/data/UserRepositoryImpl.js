const UserRepository = require('../../domain/repositories/UserRepository');
const db = require('../../../../../database/models/index');
const { Op } = require('sequelize');

class UserRepositoryImpl extends UserRepository {
  async index({ options, where }) {
    const { limit, page, sort, direction } = options;

    const { count, rows } = await db.User.scope('raw').findAndCountAll({
      where,
      include: [
        {
          model: db.CatRole,
          attributes: ['description'],
          required: true,
        },
      ],
      order: [[sort, direction]],
      offset: (page - 1) * limit,
      limit,
      paranoid: false,
    });

    return { count, rows };
  }

  async countAll(baseWhere) {
    return await db.User.scope('raw').count({
      where: baseWhere,
      include: [
        {
          model: db.CatRole,
          attributes: ['id'],
          required: true,
        },
      ],
      paranoid: false,
    });
  }

  async countByStatus(baseWhere) {
    const [active, inactive] = await Promise.all([
      db.User.count({
        where: {
          ...baseWhere,
          deletedAt: null,
        },
        paranoid: false,
      }),
      db.User.count({
        where: {
          ...baseWhere,
          deletedAt: { [Op.ne]: null },
        },
        paranoid: false,
      }),
    ]);

    return { active, inactive };
  }

  async store(body, options = {}) {
    const transaction = options.transaction;
    return await db.User.create(body, { transaction });
  }

  async edit(uid) {
    return await db.User.findOne({
      where: { uid },
      paranoid: false,
    });
  }

  async update(body, options = {}) {
    const transaction = options.transaction;
    const { uid, ...rest } = body;

    const row = await db.User.findOne({ where: { uid }, transaction });
    if (!row) return null;

    await row.update(rest, { transaction });
    return row;
  }

  async destroy(uid, options = {}) {
    const transaction = options.transaction;

    const row = await db.User.findOne({
      where: { uid },
      paranoid: false,
      transaction,
    });
    if (!row) return null;

    await row.destroy({ force: true, transaction });
    return true;
  }

  async deactivate(uid, options = {}) {
    const transaction = options.transaction;

    const row = await db.User.findOne({ where: { uid }, transaction });
    if (!row) return null;

    await row.destroy({ transaction });
    return true;
  }

  async activate(uid, options = {}) {
    const transaction = options.transaction;

    const row = await db.User.findOne({
      where: { uid },
      paranoid: false,
      transaction,
    });
    if (!row) return null;

    await row.restore({ transaction });
    return true;
  }
}

module.exports = UserRepositoryImpl;
