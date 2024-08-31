'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn('loot_table', 'piece_type', {
      type: Sequelize.ENUM(
        'accessory_upgrade',
        'armor_upgrade',
        'bracelet',
        'chest',
        'earrings',
        'feet',
        'gloves',
        'head',
        'legs',
        'necklace',
        'offhand', // shields for instance
        'ring',
        'tome',
        'weapon',
        'weapon_upgrade'
      ),      
      allowNull: false,
    });

    await queryInterface.addColumn('loot_table', 'gear_source', {
      type: Sequelize.ENUM('Raid', 'Crafted', 'Tome', 'Other'), // Define the ENUM values
      allowNull: false, // Set to true if you want to allow nulls, or false if every item must have a source
      defaultValue: 'Other', // Default value to prevent issues with existing rows
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn('loot_table', 'piece_type', {
      type: Sequelize.STRING,
      allowNull: false,
    });

    // Optional: Drop the ENUM type if necessary
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_loot_table_piece_type";');

    await queryInterface.removeColumn('loot_table', 'gear_source');
  }
};
