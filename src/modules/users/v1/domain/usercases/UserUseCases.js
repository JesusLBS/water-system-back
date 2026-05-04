const ActivateUserUseCase = require("../../domain/usercases/ActivateUserUseCase");
const CreateUserUseCase = require("../../domain/usercases/CreateUserUseCase");
const DeactivateUserUseCase = require("../../domain/usercases/DeactivateUserUseCase");
const DestroyUserUseCase = require("../../domain/usercases/DestroyUserUseCase");
const GetAllUserUseCase = require("../../domain/usercases/GetAllUserCase");
const ShowUserUseCase = require("../../domain/usercases/ShowUserCase");
const UpdateUserUseCase = require("../../domain/usercases/UpdateUserCase");

class UserUseCases {
  constructor(userRepository) {
    this.getAllUser = new GetAllUserUseCase(userRepository);
    this.createUser = new CreateUserUseCase(userRepository);
    this.deactivateUser = new DeactivateUserUseCase(userRepository);
    this.activateUser = new ActivateUserUseCase(userRepository);
    this.destroyUser = new DestroyUserUseCase(userRepository);
    this.showUser = new ShowUserUseCase(userRepository);
    this.updateUser = new UpdateUserUseCase(userRepository);
  }
}

module.exports = UserUseCases;
