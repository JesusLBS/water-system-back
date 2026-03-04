const { Op } = require('sequelize');
const {
  sanitizeParams,
  defaultOptions,
  normalizePagination,
  buildPaginationMeta,
} = require('../../../../../application/common/queryOptions');
const TimeUtil = require('../../../../../utils/TimeUtil');
const { Dependent } = require('../entities/dependent-entity');

const timeUtil = new TimeUtil('es-MX');

class GetDependentsPerSocio {
  constructor(dependentRepository) {
    this.dependentRepository = dependentRepository;
  }

  async execute({ uid, params }) {
    const cleanParams = sanitizeParams(params);

    const options = {
      ...defaultOptions(),
      ...cleanParams,
    };

    const { limit, page } = normalizePagination(options);

    const where = this.buildWhereClause(options.search, options.withTrashed);

    const { count, rows } = await this.dependentRepository.index({
      options: { ...options, limit, page },
      where,
      uid,
    });

    if (!rows) {
      throw { statusCode: 404, message: 'Data not found' };
    }

    const countAll = await this.dependentRepository.countAll({ uid });
    const { active, inactive } = await this.dependentRepository.countByStatus({ uid });

    return {
      rows: rows.map((row) => this.mapDataEntity(row).toResponse()),
      meta: buildPaginationMeta({
        total: countAll,
        filtered: count,
        limit,
        page,
        active,
        inactive,
      }),
    };
  }

  buildWhereClause(search, withTrashed) {
    const where = {
      [Op.and]: [],
    };

    if (search) {
      const searchTerms = search.split(' ').map((t) => t.trim());

      searchTerms.forEach((term) => {
        where[Op.and].push({
          [Op.or]: [
            { name: { [Op.like]: `%${term}%` } },
            { lastName: { [Op.like]: `%${term}%` } },
            { secondLastName: { [Op.like]: `%${term}%` } },
          ],
        });
      });
    }

    if (withTrashed === 'active') {
      where.deletedAt = null;
    }

    if (withTrashed === 'inactive') {
      where.deletedAt = { [Op.ne]: null };
    }

    return where;
  }

  // Maps raw database row to Dependent entity
  mapDataEntity(value) {
    const { id, name, lastName, secondLastName, createdAt, updatedAt, deletedAt } = value;

    const fullName = [name, lastName, secondLastName].filter(Boolean).join(' ');

    return new Dependent(
      id,
      fullName,
      timeUtil.transformTime(createdAt),
      timeUtil.transformTime(updatedAt),
      timeUtil.transformTime(deletedAt)
    );
  }
}

module.exports = GetDependentsPerSocio;
