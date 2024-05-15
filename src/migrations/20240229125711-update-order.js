'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.removeColumn('orders', 'name', {
      type: Sequelize.STRING,
      allowNull: false,
    })

    await queryInterface.removeColumn('orders', 'address', {
      type: Sequelize.STRING,
      allowNull: false,
    })

    await queryInterface.removeColumn('orders', 'city', {
      type: Sequelize.STRING,
      allowNull: false,
    })

    await queryInterface.removeColumn('orders', 'state', {
      type: Sequelize.STRING,
      allowNull: false,
    })

    await queryInterface.removeColumn('orders', 'zip_code', {
      type: Sequelize.STRING,
      allowNull: false,
    })

    await queryInterface.removeColumn('orders', 'contact', {
      type: Sequelize.STRING,
      allowNull: false,
    })
    
    await queryInterface.addColumn('orders', 'invoice', {
      type: Sequelize.STRING
    });
    await queryInterface.addColumn('orders', 'status', {
      type: Sequelize.STRING
    });
    await queryInterface.addColumn('orders', 'payment_status', {
      type: Sequelize.STRING
    });
    await queryInterface.addColumn('orders', 'mode_of_payment', {
      type: Sequelize.STRING
    });
    await queryInterface.addColumn('orders', 'assined_driver', {
      type: Sequelize.INTEGER
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('orders');
  }
};
