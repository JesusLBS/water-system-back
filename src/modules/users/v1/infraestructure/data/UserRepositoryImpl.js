const UserRepository = require("../../domain/repositories/UserRepository");
const db = require("../../../../../database/models/index");

class UserRepositoryImpl extends UserRepository {
  async index({ defaultOptions, where }) {
    let { limit, page, sort, direction, withTrashed } = defaultOptions;

    const rows = await db.User.scope("raw").findAll({
      where,
      include: [
        { model: db.CatRole, attributes: ["description"], required: true },
      ],
      order: [[sort, direction]],
      offset: (page - 1) * limit,
      paranoid: withTrashed,
      limit,
    });

    return rows;
  }

  countAll = async () => {
    return await db.User.scope("raw").count({ paranoid: false });
  };

  async store(body) {
    const user = await db.User.create(body);
    if (!user) return null;
    return true;
  }

  async edit(uid) {
    const user = await db.User.scope("raw").findOne({ where: { uid } });
    if (!user) return null;
    return user;
  }

  async update(body, options = {}) {
    const transaction = options.transaction;
    const uid = body.uid;
    const user = await db.User.findOne({ where: { uid }, transaction });
    if (!user) return null;
    await user.update(body, { transaction });
    return true;
  }

  async destroy(uid, options = {}) {
    const transaction = options.transaction;
    const user = await db.User.findOne({
      where: { uid },
      paranoid: false,
      transaction,
    });
    if (!user) return null;
    await user.destroy({ force: true, transaction });
    return true;
  }

  async deactivate(uid, options = {}) {
    const transaction = options.transaction;
    const user = await db.User.findOne({ where: { uid }, transaction });
    if (!user) return null;
    await user.destroy({ transaction });
    return true;
  }

  async activate(uid, options = {}) {
    const transaction = options.transaction;
    const user = await db.User.findOne({
      where: { uid },
      paranoid: false,
      transaction,
    });
    if (!user) return null;
    await user.restore({ transaction });
    return true;
  }
}

module.exports = UserRepositoryImpl;
