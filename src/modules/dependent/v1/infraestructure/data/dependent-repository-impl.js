const db = require('../../../../../database/models/index');
const DependentRepository = require('../../domain/repositories/dependent-repository');

class DependentRepositoryImpl extends DependentRepository {
  async store(body, options = {}) {
    const transaction = options.transaction;
    const row = await db.Dependent.create(body, { transaction });
    if (!row) return null;
    return row;
  }

  async getAllDependents(uid) {
    const { count, rows } = await db.Dependent.scope('raw').findAndCountAll({
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
    });
    if (!rows) return null;
    return { count, rows };
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
}

module.exports = DependentRepositoryImpl;
