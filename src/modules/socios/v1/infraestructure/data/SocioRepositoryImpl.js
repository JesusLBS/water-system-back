const db = require('../../../../../database/models/index');
const SocioRepository = require('../../domain/repositories/SocioRepository');

class SocioRepositoryImpl extends SocioRepository {
  async index({ defaultOptions, where }) {
    let { limit, page, sort, direction, withTrashed } = defaultOptions;

    const { count, rows } = await db.Socio.scope('raw').findAndCountAll({
      where,
      attributes: ['totalDependents', 'createdAt', 'updatedAt', 'deletedAt'],
      include: [
        {
          model: db.User,
          attributes: ['uid', 'name', 'email'],
          paranoid: withTrashed,
          required: true,
          include: [
            {
              model: db.Profile,
              attributes: ['lastName', 'secondLastName'],
              required: true,
            },
          ],
        },
      ],
      order: [[sort, direction]],
      offset: (page - 1) * limit,
      limit,
      paranoid: withTrashed,
    });

    return { count, rows };
  }

  countAll = async () => {
    return await db.Socio.scope('raw').count({
      include: [
        {
          model: db.User,
          attributes: ['id'],
          required: true,
          paranoid: false,
          include: [
            {
              model: db.Profile,
              attributes: ['userId'],
              required: true,
            },
          ],
        },
      ],
      paranoid: false,
    });
  };

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
              required: true,
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
