const db = require('../../../../../database/models/index');
const SocioRepository = require('../../domain/repositories/SocioRepository');
const { Op } = require('sequelize');

class SocioRepositoryImpl extends SocioRepository {
  async index({ options, where }) {
    const { limit, page, sort, direction } = options;

    const { count, rows } = await db.Socio.scope('raw').findAndCountAll({
      where,
      distinc: true,
      attributes: ['totalDependents', 'createdAt', 'updatedAt', 'deletedAt'],
      include: [
        {
          model: db.User,
          attributes: ['uid', 'name', 'email'],
          paranoid: false,
          required: true,
          include: [
            {
              model: db.Profile,
              attributes: ['lastName', 'secondLastName'],
            },
          ],
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
    return await db.Socio.scope('raw').count({
      where: baseWhere,
      include: [
        {
          model: db.User,
          attributes: ['id'],
          required: true,
          paranoid: false,
        },
      ],
      paranoid: false,
    });
  }

  async countByStatus(baseWhere) {
    const [active, inactive] = await Promise.all([
      db.Socio.count({
        where: {
          ...baseWhere,
          deletedAt: null,
        },
        paranoid: false,
      }),
      db.Socio.count({
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
    const row = await db.Socio.create(body, { transaction });
    if (!row) return null;
    return row;
  }

  async edit(uid) {
    const row = await db.Socio.scope('raw').findOne({
      attributes: ['id', 'userId', 'totalDependents'],
      include: [
        {
          model: db.User,
          where: { uid },
          attributes: ['uid', 'name', 'email'],
          required: true,
          include: [
            {
              model: db.Profile,
              attributes: ['lastName', 'secondLastName', 'mobile', 'birthdate'],
              include: [
                {
                  model: db.Address,
                  attributes: ['address', 'city', 'country'],
                  required: true,
                },
              ],
            },
          ],
        },
      ],
    });

    if (!row) return null;
    return row;
  }

  async update(body, options = {}) {
    const transaction = options.transaction;
    const { uid, ...rest } = body;
    const row = await db.Socio.findOne({ where: { uid }, transaction });
    if (!row) return null;

    await row.update({ ...rest }, { transaction });
    return row;
  }

  async destroy(uid, options = {}) {
    const transaction = options.transaction;
    const row = await db.Socio.findOne({
      attributes: ['id', 'userId'],
      include: [
        {
          model: db.User,
          where: { uid },
          attributes: ['id', 'uid'],
          required: true,
          paranoid: false,
          include: [
            {
              model: db.Profile,
              attributes: ['id'],
              required: true,
              include: [
                {
                  model: db.Address,
                  attributes: ['id'],
                  required: true,
                },
              ],
            },
          ],
        },
      ],
      paranoid: false,
      transaction,
    });
    if (!row) return null;
    await row.User.Profile.Address.destroy({ force: true, transaction });
    await row.User.destroy({ force: true, transaction });
    return true;
  }

  async deactivate(uid, options = {}) {
    const transaction = options.transaction;
    const row = await db.Socio.findOne({
      attributes: ['id', 'userId'],
      include: [
        {
          model: db.User,
          where: { uid },
          attributes: ['id', 'uid'],
          required: true,
        },
      ],
      transaction,
    });
    if (!row) return null;
    await row.destroy({ transaction });
    await row.User.destroy({ transaction });
    return true;
  }

  async activate(uid, options = {}) {
    const transaction = options.transaction;
    const row = await db.Socio.findOne({
      attributes: ['id', 'userId'],
      include: [
        {
          model: db.User,
          where: { uid },
          attributes: ['id', 'uid'],
          required: true,
          paranoid: false,
        },
      ],
      paranoid: false,
      transaction,
    });
    if (!row) return null;
    await row.restore({ transaction });
    await row.User.restore({ transaction });
    return true;
  }
}

module.exports = SocioRepositoryImpl;
