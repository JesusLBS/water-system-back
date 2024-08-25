const { Op } = require("sequelize");
const { User } = require("../entities/User");
const TimeUtil = require("../../../../../utils/TimeUtil");
const timeUtil = new TimeUtil("es-MX");

class GetAllUserUseCase {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  defaultOptions = () => ({
    limit: 10,
    page: 1,
    sort: "name",
    direction: "ASC",
    withTrashed: true,
    search: "",
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
      "null",
      ":search",
      ":sort",
      ":direction",
      ":page",
      ":limit",
      ":withTrashed",
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

    const { count, rows } = await this.userRepository.index({
      defaultOptions,
      where,
    });
    const countAll = await this.userRepository.countAll(where);

    lastPage = Math.ceil(count / defaultOptions.limit);

    if (count > defaultOptions.page * defaultOptions.limit) {
      hasMore = true;
    }

    const rowsUpdate = rows.map((value) => this.mapUserEntity(value));
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
      [Op.or]: [
        { uid: { [Op.like]: `%${search}%` } },
        { name: { [Op.like]: `%${search}%` } },
        { email: { [Op.like]: `%${search}%` } },
        { "$CatRole.description$": { [Op.like]: `%${search}%` } },
      ],
      catRoleId: { [Op.ne]: 3 }, //socio
    };
    if (!withTrashed) {
      where.deletedAt = { [Op.ne]: null };
    }
    return where;
  }

  mapUserEntity(value) {
    const { uid, name, email, CatRole, ...rest } = value;

    const transformedDates = {
      createdAt: timeUtil.transformTime(rest.createdAt),
      updatedAt: timeUtil.transformTime(rest.updatedAt),
      deletedAt: timeUtil.transformTime(rest.deletedAt),
    };

    return new User(
      uid,
      name,
      email,
      CatRole.description,
      ...Object.values(transformedDates),
    );
  }

  headersTable() {
    const headers = [
      { header: "#", key: "uid" },
      { header: "Nombre", key: "name" },
      { header: "Email", key: "email" },
      { header: "Rol", key: "role" },
      { header: "Estatus", key: "deletedAt" },
      { header: "Creado", key: "createdAt" },
      { header: "Actualizado", key: "updatedAt" },
      { header: "Acciones", key: "actions" },
    ];
    return headers;
  }
}

module.exports = GetAllUserUseCase;
