'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('cards', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      order_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
      },
      customer_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
      },
      product_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
      },
      size: {
          type: Sequelize.STRING,
          allowNull: false,
      },
      quantity: {
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
    await queryInterface.dropTable('cards');
  }
};
