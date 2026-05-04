"use strict";

const now = new Date();

const data = [
  {
    name: "single",
    description: "Soltero/a",
    createdAt: now,
    updatedAt: now,
  },
  {
    name: "married",
    description: "Casado/a",
    createdAt: now,
    updatedAt: now,
  },
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("CatMaritalStatuses", data, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("CatMaritalStatuses", null, {});
  },
};
