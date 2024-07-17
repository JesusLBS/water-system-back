"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Dependents", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      socioId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        references: {
          model: {
            tableName: "Socios",
          },
          key: "id",
          as: "socioId",
        },
      },
      isFamilyHead: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      lastName: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      secondLastName: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      mobile: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      birthdate: {
        allowNull: false,
        type: Sequelize.DATEONLY,
      },
      catRelationshipId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        references: {
          model: {
            tableName: "CatRelationships",
          },
          key: "id",
          as: "catRelationshipId",
        },
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Dependents");
  },
};
