const { Op } = require('sequelize');
const db = require('../../../../../database/models/index');
const DependentRepository = require('../../domain/repositories/dependent-repository');

class DependentRepositoryImpl extends DependentRepository {
  async store(body, options = {}) {
    const transaction = options.transaction;
    const row = await db.Dependent.create(body, { transaction });
    if (!row) return null;
    return row;
  }

  async index({ options, where, uid }) {
    const { limit, page, sort, direction } = options;

    const { count, rows } = await db.Dependent.scope('raw').findAndCountAll({
      where,
      attributes: { exclude: ['mobile', 'birthdate'] },
      include: [
        {
          model: db.Socio,
          attributes: ['id'],
          required: true,
          include: [
            {
              model: db.User,
              where: { uid },
              attributes: ['id', 'uid'],
              required: true,
            },
          ],
        },
      ],
      order: [[sort, direction]],
      offset: (page - 1) * limit,
      limit,
      paranoid: false,
      distinct: true,
    });

    return { count, rows };
  }

  async countAll({ uid }) {
    return await db.Dependent.count({
      include: [
        {
          model: db.Socio,
          required: true,
          include: [
            {
              model: db.User,
              where: { uid },
              required: true,
              paranoid: false,
            },
          ],
        },
      ],
      paranoid: false,
      distinct: true,
    });
  }

  async countByStatus({ uid }) {
    const [active, inactive] = await Promise.all([
      db.Dependent.count({
        where: { deletedAt: null },
        include: [
          {
            model: db.Socio,
            required: true,
            include: [
              {
                model: db.User,
                where: { uid },
                required: true,
                paranoid: false,
              },
            ],
          },
        ],
        paranoid: false,
        distinct: true,
      }),
      db.Dependent.count({
        where: { deletedAt: { [Op.ne]: null } },
        include: [
          {
            model: db.Socio,
            required: true,
            include: [
              {
                model: db.User,
                where: { uid },
                required: true,
                paranoid: false,
              },
            ],
          },
        ],
        paranoid: false,
        distinct: true,
      }),
    ]);

    return { active, inactive };
  }

  async edit(id) {
    const row = await db.Dependent.scope('raw').findByPk(id);
    if (!row) return null;
    return row;
  }

  async update(body, options = {}) {
    const transaction = options.transaction;
    const { id, ...rest } = body;
    const row = await db.Dependent.findByPk(id, { transaction });
    if (!row) return null;

    await row.update({ ...rest }, { transaction });
    return row;
  }

  async destroy(id, options = {}) {
    const transaction = options.transaction;
    const row = await db.Dependent.findByPk(id, {
      paranoid: false,
      transaction,
    });
    if (!row) return null;
    await row.destroy({ force: true, transaction });
    return true;
  }

  async findById(id, socioId) {
    const row = await db.Dependent.scope('raw').findOne({
      where: {
        id,
        socioId,
      },
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    });

    if (!row) return null;
    return row;
  }
}

module.exports = DependentRepositoryImpl;
