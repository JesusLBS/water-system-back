const { Op } = require('sequelize');
const { WaterLine } = require('../entities/water-line');
const {
  sanitizeParams,
  defaultOptions,
  normalizePagination,
  buildPaginationMeta,
} = require('../../../../../application/common/queryOptions');
const TimeUtil = require('../../../../../utils/TimeUtil');

const timeUtil = new TimeUtil('es-MX');

class GetAllWaterLinesUseCase {
  constructor(waterLinesRepository) {
    this.waterLinesRepository = waterLinesRepository;
  }

  async execute(params) {
    const cleanParams = sanitizeParams(params);

    const options = {
      ...defaultOptions(),
      ...cleanParams,
    };

    const { limit, page } = normalizePagination(options);

    const where = this.buildWhereClause(options.search, options.withTrashed);

    const { count, rows } = await this.waterLinesRepository.index({
      options: { ...options, limit, page },
      where,
    });

    if (!rows) {
      throw { statusCode: 404, message: 'Data not found' };
    }

    const countAll = await this.waterLinesRepository.countAll();

    const { active, inactive } = await this.waterLinesRepository.countByStatus();

    return {
      rows: rows.map((row) => this.mapDataEntity(row)),
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
      const searchTerms = search.split(' ').map((term) => term.trim());

      searchTerms.forEach((term) => {
        where[Op.and].push({
          [Op.or]: [{ name: { [Op.like]: `%${term}%` } }],
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

  mapDataEntity(value) {
    const { id, name, createdAt, updatedAt, deletedAt } = value;

    const waterLine = new WaterLine(
      id,
      name,
      deletedAt ? 'inactive' : 'active',
      timeUtil.transformTime(createdAt),
      timeUtil.transformTime(updatedAt),
      timeUtil.transformTime(deletedAt)
    );

    return waterLine.toResponse();
  }
}

module.exports = GetAllWaterLinesUseCase;
