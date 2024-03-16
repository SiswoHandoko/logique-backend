'use strict';
const bcrypt = require('bcrypt');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('user', [
      {
        name: 'Siswo Handoko',
        address: 'JL. Pegangsaan Timur No 56, Jakarta Barat',
        email: 'handoko@gmail.com',
        password: await bcrypt.hash('12345', 10),
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Dimas Wahyudi',
        address: 'JL. Riau No 33, Jakarta Utara',
        email: 'dimas@gmail.com',
        password: await bcrypt.hash('12345', 10),
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('user', null, {});
  }
};
