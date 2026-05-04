'use strict';

const { faker } = require('@faker-js/faker');
const { QueryTypes, Op } = require('sequelize');

module.exports = {
  async up(queryInterface) {
    const TARGET_TOTAL = 500;
    const now = new Date();
    const MAIN_EMAIL = 'chichohdzjesus@gmail.com';

    // 1) Ensure main user exists
    const mainUser = await queryInterface.sequelize.query(`SELECT id FROM Users WHERE email = :email LIMIT 1`, {
      replacements: { email: MAIN_EMAIL },
      type: QueryTypes.SELECT,
    });

    if (!mainUser.length) {
      await queryInterface.bulkInsert('Users', [
        {
          uid: 'Alop2OSLPPWeXWd1EYHNydkEg492',
          name: 'jesus',
          email: MAIN_EMAIL,
          catRoleId: 1,
          createdAt: now,
          updatedAt: now,
        },
      ]);
    }

    // 2) fetch existing total users
    const [{ total }] = await queryInterface.sequelize.query(`SELECT COUNT(*) as total FROM Users`, {
      type: QueryTypes.SELECT,
    });

    const missing = TARGET_TOTAL - total;
    if (missing <= 0) return;

    // 3) fetch available roles
    const roles = await queryInterface.sequelize.query(`SELECT id FROM CatRoles`, { type: QueryTypes.SELECT });
    const roleIds = roles.map((r) => r.id);
    // fallback if roles table empty
    if (!roleIds.length) roleIds.push(1, 2, 3);

    // 4) insert missing users with random role
    const data = [];
    for (let i = 0; i < missing; i++) {
      const randomRole = roleIds[Math.floor(Math.random() * roleIds.length)];
      data.push({
        uid: faker.string.uuid(),
        name: faker.person.fullName(),
        email: faker.internet.email().toLowerCase(),
        catRoleId: randomRole,
        createdAt: now,
        updatedAt: now,
      });
    }

    await queryInterface.bulkInsert('Users', data, {});
  },

  async down(queryInterface) {
    // Remove generated users except MAIN_EMAIL
    await queryInterface.bulkDelete('Users', { email: { [Op.ne]: 'chichohdzjesus@gmail.com' } }, {});
  },
};
