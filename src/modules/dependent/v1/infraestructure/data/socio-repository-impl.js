const db = require('../../../../../database/models/index');
const SocioRepository = require('../../domain/repositories/socio-repository');

class SocioRepositoryImpl extends SocioRepository {
  async findSocioByUserUid(uid) {
    const row = await db.Socio.scope('raw').findOne({
      attributes: ['id'],
      include: [
        {
          model: db.User,
          where: { uid },
          attributes: ['uid'],
          required: true,
        },
      ],
    });

    if (!row) return null;
    return row;
  }

  async incrementeSocioByUserUid(uid, increment, options = {}) {
    const transaction = options.transaction;
    const row = await db.Socio.findOne({
      include: [
        {
          model: db.User,
          where: { uid },
          attributes: ['id'],
          required: true,
        },
      ],
      transaction,
    });

    if (!row) {
      return null;
    }

    await db.Socio.increment(
      { totalDependents: increment },
      {
        where: { id: row.id },
        transaction,
      }
    );

    return row;
  }
}

module.exports = SocioRepositoryImpl;
