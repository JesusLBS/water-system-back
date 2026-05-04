const ActivateSocioUseCase = require('./ActivateSocioUseCase');
const CreateSocioUseCase = require('./CreateSocioUseCase');
const DeactivateSocioUseCase = require('./DeactivateSocioUseCase');
const DestroySocioUseCase = require('./DestroySocioUseCase');
const GetAllSocioUseCase = require('./GetAllSocioCase');
const ShowSocioUseCase = require('./ShowSocioUseCase');
const UpdateSocioUseCase = require('./UpdateSocioUseCase');

class SocioUseCases {
  constructor(socioRepository, userRepository, addressRepository, profileRepository) {
    this.getAllSocio = new GetAllSocioUseCase(socioRepository);
    this.createSocio = new CreateSocioUseCase(socioRepository, userRepository, addressRepository, profileRepository);
    this.showSocio = new ShowSocioUseCase(socioRepository);
    this.updateSocio = new UpdateSocioUseCase(userRepository, profileRepository);
    this.deactivateSocio = new DeactivateSocioUseCase(socioRepository);
    this.activateSocio = new ActivateSocioUseCase(socioRepository);
    this.destroySocio = new DestroySocioUseCase(socioRepository);
  }
}

module.exports = SocioUseCases;
