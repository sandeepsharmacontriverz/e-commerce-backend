'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.addColumn('cards', 'size_new', {
      type: Sequelize.INTEGER,
      allowNull: false,
    });

    // Find and update any non-integer values in the "quantity" column
    const cards = await queryInterface.sequelize.query('SELECT * FROM cards', { type: Sequelize.QueryTypes.SELECT });

    for (const card of cards) {
      const quantity = parseInt(card.quantity); // Parse the quantity value to an integer
      if (!isNaN(quantity)) {
        await queryInterface.sequelize.query(`UPDATE cards SET size_new = ${quantity} WHERE id = ${card.id}`);
      }
    }

    // Remove the old "quantity" column
    await queryInterface.removeColumn('cards', 'size');

    // Rename the new column to "quantity"
    await queryInterface.renameColumn('cards', 'size_new', 'size');

  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('cards');
  }
};
