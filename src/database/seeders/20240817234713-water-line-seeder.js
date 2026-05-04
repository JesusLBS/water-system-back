'use strict';

const now = new Date();

const data = [];

for (let i = 0; i < 7; i++) {
  data.push({
    name: `Línea ${i + 1}`,
    createdAt: now,
    updatedAt: now,
  });
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('WaterLines', data, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('WaterLines', null, {});
  },
};
