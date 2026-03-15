function defaultOptions() {
  return {
    search: '',
    limit: 10,
    page: 1,
    sort: 'updatedAt',
    direction: 'DESC',
    withTrashed: 'active', // active | inactive | all
  };
}

function sanitizeParams(params) {
  return Object.fromEntries(Object.entries(params).filter(([, value]) => value !== undefined));
}

function normalizePagination(options) {
  const limit = Math.min(Math.max(Number(options.limit) || 10, 1), 100);
  const page = Math.max(Number(options.page) || 1, 1);

  return { limit, page };
}

function buildPaginationMeta({ total, filtered, limit, page, active = 0, inactive = 0 }) {
  const lastPage = Math.max(Math.ceil(filtered / limit), 1);
  const from = filtered === 0 ? 0 : (page - 1) * limit + 1;
  const to = Math.min(page * limit, filtered);

  return {
    total,
    active,
    inactive,
    filtered,
    perPage: limit,
    currentPage: page,
    lastPage,
    from,
    to,
    hasNextPage: page < lastPage,
    hasPrevPage: page > 1,
  };
}

module.exports = {
  defaultOptions,
  sanitizeParams,
  normalizePagination,
  buildPaginationMeta,
};
