'use strict';

const { faker } = require('@faker-js/faker');
const { QueryTypes, Op } = require('sequelize');

module.exports = {
  async up(queryInterface) {
    const now = new Date();
    const SOCIOS_COUNT = 100;

    // 1) fetch all users
    const users = await queryInterface.sequelize.query(`SELECT id FROM Users`, { type: QueryTypes.SELECT });
    const userIds = users.map((u) => u.id);
    if (userIds.length < SOCIOS_COUNT) {
      throw new Error(`Not enough users to create ${SOCIOS_COUNT} socios`);
    }

    // 2) shuffle and pick first 100
    function shuffle(a) {
      for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
      }
      return a;
    }
    const selected = shuffle([...userIds]).slice(0, SOCIOS_COUNT);

    // 3) find socio role id (fallback to 3)
    const roles = await queryInterface.sequelize.query(`SELECT id, role FROM CatRoles WHERE role = 'socio' LIMIT 1`, {
      type: QueryTypes.SELECT,
    });
    const socioRoleId = roles.length ? roles[0].id : 3;

    // 4) update selected users role -> socio
    await queryInterface.bulkUpdate('Users', { catRoleId: socioRoleId, updatedAt: now }, { id: { [Op.in]: selected } });

    // 5) create Socios rows
    const sociosData = selected.map((uid) => ({
      userId: uid,
      totalDependents: 0,
      createdAt: now,
      updatedAt: now,
    }));

    await queryInterface.bulkInsert('Socios', sociosData, {});

    // 6) create WaterTakes linking socio -> waterline (if WaterLines exist)
    // get inserted socios ids (we can query last inserted by createdAt)
    const socios = await queryInterface.sequelize.query(`SELECT id FROM Socios WHERE createdAt = :now`, {
      replacements: { now },
      type: QueryTypes.SELECT,
    });
    const waterLines = await queryInterface.sequelize.query(`SELECT id FROM WaterLines`, { type: QueryTypes.SELECT });
    const waterIds = waterLines.map((w) => w.id);
    const wtData = [];

    // if there are no waterlines, skip water takes
    if (waterIds.length) {
      for (const s of socios) {
        const randomWL = waterIds[Math.floor(Math.random() * waterIds.length)];
        wtData.push({
          socioId: s.id,
          waterLineId: randomWL,
          createdAt: now,
          updatedAt: now,
        });
      }
      await queryInterface.bulkInsert('WaterTakes', wtData, {});
    }
  },

  async down(queryInterface) {
    // attempt to delete Socios inserted with matching createdAt - may vary across DBs
    await queryInterface.bulkDelete('WaterTakes', null, {});
    await queryInterface.bulkDelete('Socios', null, {});
  },
};
