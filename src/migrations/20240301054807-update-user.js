'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
      await queryInterface.addColumn('users', 'address', {
        type: Sequelize.STRING
      });

      await queryInterface.addColumn('users', 'city', {
        type: Sequelize.STRING
      });

      await queryInterface.addColumn('users', 'state', {
        type: Sequelize.STRING
      });

      await queryInterface.addColumn('users', 'zip_code', {
        type: Sequelize.STRING
      });
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};
