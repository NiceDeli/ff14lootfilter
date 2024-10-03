'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('loot_table', 'iLvl', {
      type: Sequelize.INTEGER, // Define the ENUM values
      allowNull: false, // Set to true if you want to allow nulls, or false if every item must have a source
    });

    await queryInterface.removeColumn('loot_table', 'loot_type');
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('loot_table', 'iLvl');

    await queryInterface.addColumn('loot_table', 'loot_type', {
      type: Sequelize.INTEGER,
      allowNull: false,
    })
  }
};
