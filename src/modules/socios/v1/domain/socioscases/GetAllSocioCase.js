const { Op } = require('sequelize');
const TimeUtil = require('../../../../../utils/TimeUtil');
const { Socio } = require('../entities/Socio');
const timeUtil = new TimeUtil('es-MX');

class GetAllSocioUseCase {
  constructor(socioRepository) {
    this.socioRepository = socioRepository;
  }

  defaultOptions = () => ({
    limit: 10,
    page: 1,
    sort: 'id',
    direction: 'ASC',
    withTrashed: true,
    search: '',
    hasMore: false,
    lastPage: 1,
  });

  async execute(params) {
    let defaultOptions = this.defaultOptions();

    let { search, hasMore, lastPage } = defaultOptions;
    let { sort, direction, page, limit, withTrashed } = params;

    const isValid = [
      undefined,
      "''",
      null,
      'null',
      ':search',
      ':sort',
      ':direction',
      ':page',
      ':limit',
      ':withTrashed',
    ];

    if (!isValid.includes(params.search)) {
      search = params.search;
    }
    if (!isValid.includes(sort)) {
      defaultOptions.sort = sort;
    }
    if (!isValid.includes(direction)) {
      defaultOptions.direction = direction;
    }
    if (!isValid.includes(page)) {
      defaultOptions.page = +page;
    }
    if (!isValid.includes(limit)) {
      defaultOptions.limit = +limit;
    }
    if (!isValid.includes(withTrashed)) {
      defaultOptions.withTrashed = +withTrashed ? true : false;
    }

    const where = this.buildWhereClause(search, defaultOptions.withTrashed);

    const { count, rows } = await this.socioRepository.index({
      defaultOptions,
      where,
    });
    const countAll = await this.socioRepository.countAll();

    lastPage = Math.ceil(count / defaultOptions.limit);

    if (count > defaultOptions.page * defaultOptions.limit) {
      hasMore = true;
    }

    const rowsUpdate = rows.map((value) => this.mapDataEntity(value));
    const headers = this.headersTable();
    return {
      countAll,
      count,
      rows: rowsUpdate,
      headers,
      page: defaultOptions.page,
      lastPage,
      hasMore,
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
    if (!withTrashed) {
      where[Op.and].push({ '$User.deletedAt$': { [Op.ne]: null } });
    }
    return where;
  }

  mapDataEntity(value) {
    const { User, totalDependents, ...rest } = value;
    const {
      Profile: { lastName, secondLastName },
      uid,
      name,
      email,
    } = User;
    const fullName = `${name} ${lastName} ${secondLastName}`;

    const transformedDates = {
      createdAt: timeUtil.transformTime(rest.createdAt),
      updatedAt: timeUtil.transformTime(rest.updatedAt),
      deletedAt: timeUtil.transformTime(rest.deletedAt),
    };

    return new Socio(uid, fullName, email, totalDependents, ...Object.values(transformedDates));
  }

  headersTable() {
    const headers = [
      { header: '#', key: 'uid' },
      { header: 'Nombre', key: 'fullName' },
      { header: 'Email', key: 'email' },
      { header: 'Dependientes', key: 'totalDependents' },
      { header: 'Estatus', key: 'deletedAt' },
      { header: 'Creado', key: 'createdAt' },
      { header: 'Actualizado', key: 'updatedAt' },
      { header: 'Acciones', key: 'actions' },
    ];
    return headers;
  }
}

module.exports = GetAllSocioUseCase;
