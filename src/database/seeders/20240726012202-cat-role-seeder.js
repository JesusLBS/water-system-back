"use strict";

const now = new Date();

const data = [
  {
    id: 1,
    role: "root",
    description: "Root User",
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 2,
    role: "admin",
    description: "Admin",
    createdAt: now,
    updatedAt: now,
  },
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("CatRoles", data, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("CatRoles", null, {});
  },
};
