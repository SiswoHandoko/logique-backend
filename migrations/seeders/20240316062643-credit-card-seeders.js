'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.bulkInsert('credit_card', [
      {
        user_id: 1,
        type: 'Silver',
        number: '9009129389192',
        name: 'Siswo Handoko',
        expired: '04/2028',
        cvv: '442',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        user_id: 2,
        type: 'Platinum',
        number: '8747281200122',
        name: 'Dimas Wahyudi',
        expired: '02/2024',
        cvv: '818',
        created_at: new Date(),
        updated_at: new Date()
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('credit_card', null, {});
  }
};
