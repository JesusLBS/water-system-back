"use strict";

const now = new Date();

const data = [
  {
    name: "male",
    description: "Masculino",
    createdAt: now,
    updatedAt: now,
  },
  {
    name: "female",
    description: "Femenino",
    createdAt: now,
    updatedAt: now,
  },
  {
    name: "other",
    description: "Otro",
    createdAt: now,
    updatedAt: now,
  },
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("CatGenders", data, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("CatGenders", null, {});
  },
};
