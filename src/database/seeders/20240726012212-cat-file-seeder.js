"use strict";

const now = new Date();

const data = [
  {
    name: "payment_receipt",
    description: "Recibo de pago",
    createdAt: now,
    updatedAt: now,
  },
  {
    name: "material_purchase_receipt",
    description: "Recibo de compra de materiales",
    createdAt: now,
    updatedAt: now,
  },
  {
    name: "membership_certificate",
    description: "Certificado de socio",
    createdAt: now,
    updatedAt: now,
  },
  {
    name: "water_usage_report",
    description: "Informe de uso de agua",
    createdAt: now,
    updatedAt: now,
  },
  {
    name: "maintenance_record",
    description: "Registro de mantenimiento",
    createdAt: now,
    updatedAt: now,
  },
  {
    name: "contract",
    description: "Contrato",
    createdAt: now,
    updatedAt: now,
  },
  {
    name: "complaint_document",
    description: "Documento de queja",
    createdAt: now,
    updatedAt: now,
  },
  {
    name: "general_notice",
    description: "Aviso general",
    createdAt: now,
    updatedAt: now,
  },
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("CatFiles", data, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("CatFiles", null, {});
  },
};
