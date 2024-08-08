const {
  AuthService,
} = require("../../../../../services/internal/auth.service");

class AuthenticateUserUseCase {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute(uid) {
    const user = await this.userRepository.findUserByUid(uid);
    if (!user) {
      throw { statusCode: 404, message: "User not found" };
    }

    const token = await new AuthService().token(user);

    return { token };
  }
}

module.exports = AuthenticateUserUseCase;
