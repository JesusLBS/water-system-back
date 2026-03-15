'use strict';

const { faker } = require('@faker-js/faker');
const { QueryTypes, Op } = require('sequelize');

module.exports = {
  async up(queryInterface) {
    const now = new Date();

    // 1) fetch all socios
    const socios = await queryInterface.sequelize.query(`SELECT id FROM Socios`, { type: QueryTypes.SELECT });
    if (!socios.length) return;

    const dependentsData = [];
    const countsBySocio = [];

    for (const s of socios) {
      const count = Math.floor(Math.random() * 4) + 5; // 5..8
      countsBySocio.push({ socioId: s.id, count });

      for (let i = 0; i < count; i++) {
        dependentsData.push({
          socioId: s.id,
          isFamilyHead: i === 0 ? 1 : 0,
          name: faker.person.firstName(),
          lastName: faker.person.lastName(),
          secondLastName: faker.person.lastName(),
          mobile: faker.phone.number('55########'),
          birthdate: faker.date.birthdate({ min: 0, max: 60, mode: 'age' }),
          catRelationshipId: Math.floor(Math.random() * 5) + 1,
          createdAt: now,
          updatedAt: now,
        });
      }
    }

    // 2) bulk insert dependents
    await queryInterface.bulkInsert('Dependents', dependentsData, {});

    // 3) update Socio.totalDependents per socio
    for (const item of countsBySocio) {
      await queryInterface.bulkUpdate('Socios', { totalDependents: item.count, updatedAt: now }, { id: item.socioId });
    }
  },

  async down(queryInterface) {
    // delete all dependents inserted by this seeder
    await queryInterface.bulkDelete('Dependents', null, {});
    // reset totalDependents to 0
    await queryInterface.bulkUpdate('Socios', { totalDependents: 0 }, {});
  },
};
