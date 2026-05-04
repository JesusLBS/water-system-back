const UserRepository = require("../../domain/repositories/UserRepository");
const db = require("../../../../../database/models/index");
const User = require("../../domain/entities/User");

class UserRepositoryImpl extends UserRepository {
  async findUserByUid(uid) {
    const user = await db.User.scope("raw").findOne({
      where: { uid },
      include: [{ model: db.CatRole, attributes: ["role"], required: true }],
    });

    if (!user) return null;
    return new User(user.uid, user.email, user.CatRole.role);
  }
}

module.exports = UserRepositoryImpl;
