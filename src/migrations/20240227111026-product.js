'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('product', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      cat_id: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      product_name: {
          type: Sequelize.STRING,
          allowNull: false,
      },
      product_desc: {
          type: Sequelize.STRING,
          allowNull: false,
      },
      images: {
          type: Sequelize.STRING,
          allowNull: false,
      },
      brand: {
          type: Sequelize.STRING,
          allowNull: false,
      },
      color: {
          type: Sequelize.STRING,
          allowNull: false,
      },
      price: {
          type: Sequelize.STRING,
          allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('product');
  }
};
