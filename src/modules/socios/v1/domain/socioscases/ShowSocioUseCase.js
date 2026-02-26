const TimeUtil = require('../../../../../utils/TimeUtil');
const { SocioShow } = require('../entities/Socio');
const timeUtil = new TimeUtil('es-MX');

class ShowSocioUseCase {
  constructor(socioRepository) {
    this.socioRepository = socioRepository;
  }

  async execute(uid) {
    const row = await this.socioRepository.edit(uid);

    if (!row) {
      throw { statusCode: 404, message: 'Data not found' };
    }

    const age = timeUtil.getAge(row.User.Profile.birthdate);

    const socioShow = new SocioShow({
      ...row,
      age,
      waterLineId: row.WaterTake?.waterLineId || null,
    });

    return socioShow.toResponse();
  }
}

module.exports = ShowSocioUseCase;
