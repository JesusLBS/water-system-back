const { Op } = require('sequelize');
const { User } = require('../entities/User');
const TimeUtil = require('../../../../../utils/TimeUtil');
const timeUtil = new TimeUtil('es-MX');
class GetAllUserUseCase {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  // Default pagination and filter options
  defaultOptions() {
    return {
      search: '',
      limit: 10,
      page: 1,
      sort: 'name',
      direction: 'ASC',
      withTrashed: 'all', // active | inactive | all
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

    const { count, rows } = await this.userRepository.index({
      options: { ...options, limit, page },
      where,
    });

    const countAll = await this.userRepository.countAll({
      catRoleId: { [Op.ne]: 3 },
    });
    const baseWhere = { catRoleId: { [Op.ne]: 3 } };
    const { active, inactive } = await this.userRepository.countByStatus(baseWhere);
    const lastPage = Math.max(Math.ceil(count / limit), 1);
    const from = count === 0 ? 0 : (page - 1) * limit + 1;
    const to = Math.min(page * limit, count);

    return {
      rows: rows.map((row) => this.mapUserEntity(row)),
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

  // Build search and status filters
  buildWhereClause(search, withTrashed) {
    const where = {
      [Op.or]: [
        { uid: { [Op.like]: `%${search}%` } },
        { name: { [Op.like]: `%${search}%` } },
        { email: { [Op.like]: `%${search}%` } },
        { '$CatRole.description$': { [Op.like]: `%${search}%` } },
      ],
      catRoleId: { [Op.ne]: 3 }, // exclude socio
    };

    if (withTrashed === 'active') {
      where.deletedAt = null;
    }

    if (withTrashed === 'inactive') {
      where.deletedAt = { [Op.ne]: null };
    }

    return where;
  }

  mapUserEntity(value) {
    const user = new User(
      value.uid,
      value.name,
      value.email,
      value.CatRole?.description || null,
      value.deletedAt ? 'inactive' : 'active',
      timeUtil.transformTime(value.createdAt),
      timeUtil.transformTime(value.updatedAt),
      value.deletedAt
    );

    return user.toResponse();
  }
}

module.exports = GetAllUserUseCase;
