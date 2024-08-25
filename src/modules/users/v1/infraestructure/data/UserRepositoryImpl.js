const UserRepository = require("../../domain/repositories/UserRepository");
const db = require("../../../../../database/models/index");

class UserRepositoryImpl extends UserRepository {
  async index({ defaultOptions, where }) {
    const { limit, page, sort, direction, withTrashed } = defaultOptions;

    const { count, rows } = await db.User.scope("raw").findAndCountAll({
      where,
      include: [
        {
          model: db.CatRole,
          attributes: ["description"],
          required: true,
        },
      ],
      order: [[sort, direction]],
      offset: (page - 1) * limit,
      paranoid: withTrashed,
      limit,
    });

    return { count, rows };
  }

  countAll = async (where) => {
    return await db.User.scope("raw").count({
      where,
      include: [
        {
          model: db.CatRole,
          attributes: ["id"],
          required: true,
        },
      ],
      paranoid: false,
    });
  };

  async store(body, options = {}) {
    const transaction = options.transaction;
    const row = await db.User.create(body, { transaction });
    if (!row) return null;
    return row;
  }

  async edit(uid) {
    const row = await db.User.scope("raw").findOne({ where: { uid } });
    if (!row) return null;
    return row;
  }

  async update(body, options = {}) {
    const transaction = options.transaction;
    const { uid, ...rest } = body;
    const row = await db.User.findOne({ where: { uid }, transaction });
    if (!row) return null;

    await row.update({ ...rest }, { transaction });
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
