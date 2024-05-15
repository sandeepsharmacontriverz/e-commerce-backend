'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.changeColumn('cards', 'order_id', {
      type: Sequelize.INTEGER,
      allowNull: true,
    });

    await queryInterface.addColumn('cards', 'quantity_new', {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0, // Assuming 0 is a suitable default value
    });

    // Find and update any non-integer values in the "quantity" column
    const cards = await queryInterface.sequelize.query('SELECT * FROM cards', { type: Sequelize.QueryTypes.SELECT });

    for (const card of cards) {
      const quantity = parseInt(card.quantity); // Parse the quantity value to an integer
      if (!isNaN(quantity)) {
        await queryInterface.sequelize.query(`UPDATE cards SET quantity_new = ${quantity} WHERE id = ${card.id}`);
      }
    }

    // Remove the old "quantity" column
    await queryInterface.removeColumn('cards', 'quantity');

    // Rename the new column to "quantity"
    await queryInterface.renameColumn('cards', 'quantity_new', 'quantity');

  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('cards');
  }
};
