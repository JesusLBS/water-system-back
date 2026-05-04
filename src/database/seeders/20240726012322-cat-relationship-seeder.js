"use strict";

const now = new Date();

const data = [
  {
    relationship: "father",
    description: "Padre",
    createdAt: now,
    updatedAt: now,
  },
  {
    relationship: "mother",
    description: "Madre",
    createdAt: now,
    updatedAt: now,
  },
  {
    relationship: "son",
    description: "Hijo",
    createdAt: now,
    updatedAt: now,
  },
  {
    relationship: "daughter",
    description: "Hija",
    createdAt: now,
    updatedAt: now,
  },
  {
    relationship: "brother",
    description: "Hermano",
    createdAt: now,
    updatedAt: now,
  },
  {
    relationship: "sister",
    description: "Hermana",
    createdAt: now,
    updatedAt: now,
  },
  {
    relationship: "spouse",
    description: "Esposo/a",
    createdAt: now,
    updatedAt: now,
  },
  {
    relationship: "grandfather",
    description: "Abuelo",
    createdAt: now,
    updatedAt: now,
  },
  {
    relationship: "grandmother",
    description: "Abuela",
    createdAt: now,
    updatedAt: now,
  },
  {
    relationship: "grandson",
    description: "Nieto",
    createdAt: now,
    updatedAt: now,
  },
  {
    relationship: "granddaughter",
    description: "Nieta",
    createdAt: now,
    updatedAt: now,
  },
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("CatRelationships", data, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("CatRelationships", null, {});
  },
};
