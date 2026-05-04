const { UserShow } = require("../entities/User");

class ShowUserUseCase {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute(userData) {
    const user = await this.userRepository.edit(userData);
    if (!user) {
      throw { statusCode: 404, message: "Data not found" };
    }

    return new UserShow(user.uid, user.name, user.email, user.catRoleId);
  }
}

module.exports = ShowUserUseCase;
