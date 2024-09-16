'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint('loot_table', {
      fields: ['floor_id'],
      type: 'foreign key',
      name: 'floor_from_loot_table',
      references:{
        table: 'floor',
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });

    await queryInterface.addConstraint('kill_history', {
      fields: ['floor_id'],
      type: 'foreign key',
      name: 'floor_from_kill_history',
      references:{
        table: 'floor',
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });

    await queryInterface.addConstraint('mita_algorithm', {
      fields: ['floor_id'],
      type: 'foreign key',
      name: 'floor_from_mita_algorithm',
      references:{
        table: 'floor',
        field: "id"
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('loot_table', 'floor_from_loot_table'); 
    await queryInterface.removeConstraint('kill_history', 'floor_from_kill_history');
    await queryInterface.removeConstraint('mita_algorithm', 'floor_from_mita_algorithm');
  }
};
