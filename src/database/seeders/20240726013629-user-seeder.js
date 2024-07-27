"use strict";

const now = new Date();

const data = [
  {
    id: 1,
    uid: "Alop2OSLPPWeXWd1EYHNydkEg492",
    email: "chichohdzjesus@gmail.com",
    catRoleId: 1, //root
    createdAt: now,
    updatedAt: now,
  },
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Users", data, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
