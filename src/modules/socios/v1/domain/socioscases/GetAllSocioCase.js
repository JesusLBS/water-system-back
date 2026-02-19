const { Op } = require('sequelize');
const TimeUtil = require('../../../../../utils/TimeUtil');
const { Socio } = require('../entities/Socio');
const timeUtil = new TimeUtil('es-MX');

class GetAllSocioUseCase {
  constructor(socioRepository) {
    this.socioRepository = socioRepository;
  }

  defaultOptions() {
    return {
      search: '',
      limit: 10,
      page: 1,
      sort: 'updatedAt',
      direction: 'DESC',
      withTrashed: 'active', // active | inactive | all
    };
  }

  sanitizeParams(params) {
    return Object.fromEntries(Object.entries(params).filter(([, value]) => value !== undefined));
  }

  normalizePagination(options) {
    const limit = Math.min(Math.max(Number(options.limit) || 10, 1), 100);
    const page = Math.max(Number(options.page) || 1, 1);
    return { limit, page };
  }

  async execute(params) {
    const cleanParams = this.sanitizeParams(params);

    const options = {
      ...this.defaultOptions(),
      ...cleanParams,
    };

    const { limit, page } = this.normalizePagination(options);

    const where = this.buildWhereClause(options.search, options.withTrashed);

    const { count, rows } = await this.socioRepository.index({
      options: { ...options, limit, page },
      where,
    });

    const countAll = await this.socioRepository.countAll({});

    const { active, inactive } = await this.socioRepository.countByStatus({});
    const lastPage = Math.max(Math.ceil(count / limit), 1);
    const from = count === 0 ? 0 : (page - 1) * limit + 1;
    const to = Math.min(page * limit, count);

    return {
      rows: rows.map((row) => this.mapDataEntity(row)),
      meta: {
        total: countAll,
        active,
        inactive,
        filtered: count,
        perPage: limit,
        currentPage: page,
        lastPage,
        from,
        to,
        hasNextPage: page < lastPage,
        hasPrevPage: page > 1,
      },
    };
  }

  buildWhereClause(search, withTrashed) {
    const where = {
      [Op.and]: [],
    };

    const searchTerms = search.split(' ').map((term) => term.trim());

    searchTerms.forEach((term) => {
      where[Op.and].push({
        [Op.or]: [
          { totalDependents: { [Op.like]: `%${term}%` } },
          { '$User.uid$': { [Op.like]: `%${term}%` } },
          { '$User.email$': { [Op.like]: `%${term}%` } },
          { '$User.name$': { [Op.like]: `%${term}%` } },
          { '$User->Profile.lastName$': { [Op.like]: `%${term}%` } },
          { '$User->Profile.secondLastName$': { [Op.like]: `%${term}%` } },
        ],
      });
    });

    if (withTrashed === 'active') {
      where.deletedAt = null;
    }

    if (withTrashed === 'inactive') {
      where.deletedAt = { [Op.ne]: null };
    }

    return where;
  }

  mapDataEntity(value) {
    const { User, totalDependents, ...rest } = value;
    const { Profile, uid, name, email } = User;
    const lastName = Profile?.lastName;
    const secondLastName = Profile?.secondLastName;

    const fullName = [name, lastName, secondLastName].filter((v) => v != null).join(' ');

    const socio = new Socio(
      uid,
      fullName,
      email,
      totalDependents,
      rest.deletedAt ? 'inactive' : 'active',
      timeUtil.transformTime(rest.createdAt),
      timeUtil.transformTime(rest.updatedAt),
      rest.deletedAt
    );
    return socio.toResponse();
  }
}

module.exports = GetAllSocioUseCase;
