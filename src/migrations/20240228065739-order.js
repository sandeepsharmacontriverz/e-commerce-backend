'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('orders', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      customer_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
      },
      name: {
          type: Sequelize.STRING,
          allowNull: false,
      },
      address: {
          type: Sequelize.STRING,
          allowNull: false,
      },
      city: {
          type: Sequelize.STRING,
          allowNull: false,
      },
      state: {
          type: Sequelize.STRING,
          allowNull: false,
      },
      zip_code: {
          type: Sequelize.STRING,
          allowNull: false,
      },
      contact: {
          type: Sequelize.STRING,
          allowNull: false,
      },
      createdAt: {
          type: Sequelize.DATE,
          allowNull: false,
      },
      updatedAt: {
          type: Sequelize.DATE,
          allowNull: false,
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('orders');
  }
};
