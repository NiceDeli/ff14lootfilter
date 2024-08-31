'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.renameColumn('loot_table', 'floor', 'floor_id');
    await queryInterface.renameColumn('kill_history', 'floor', 'floor_id');
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.renameColumn('table_name', 'floor_id', 'floor');
    await queryInterface.renameColumn('kill_history', 'floor_id', 'floor');
  }
};
