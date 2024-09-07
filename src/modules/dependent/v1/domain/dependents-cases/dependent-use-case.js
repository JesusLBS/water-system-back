const CreateDependentUseCase = require('./create-dependent-use-case');
const GetDependentsPerSocio = require('./show-dependents-use-case');
const ShowDependentUseCase = require('./show-dependent-use-case');
const DestroyDependentUseCase = require('./destroy-dependent-use-case');
const UpdateDependentUseCase = require('./update-dependent-use-case');

class DependentUseCases {
  constructor(dependentRepository, socioRepository) {
    this.createDependent = new CreateDependentUseCase(dependentRepository, socioRepository);
    this.getDependentsPerSocio = new GetDependentsPerSocio(dependentRepository);
    this.showDependent = new ShowDependentUseCase(dependentRepository);
    this.destroyDependent = new DestroyDependentUseCase(dependentRepository, socioRepository);
    this.updateDependent = new UpdateDependentUseCase(dependentRepository);
  }
}

module.exports = DependentUseCases;
