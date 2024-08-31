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
        'weapon',
        'weapon_upgrade'
      ),      
      allowNull: false,
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn('loot_table', 'piece_type', {
      type: Sequelize.STRING,
      allowNull: false,
    });

    // Optional: Drop the ENUM type if necessary
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_loot_table_piece_type";');
  }
};
