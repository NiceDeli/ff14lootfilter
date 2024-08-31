'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.addConstraint('loot_table', {
      fields: ['floor_id'], // Replace with your actual column name
      type: 'unique',
      name: 'loot_table_unique_column_constraint', // Provide a constraint name
    });

    await queryInterface.addConstraint('mita_algorithm', {
      fields: ['floor_id'], // Replace with your actual column name
      type: 'unique',
      name: 'mita_algorithm_unique_column_constraint', // Provide a constraint name
    });
    await queryInterface.removeConstraint('mita_algorithm', 'floor_from_kill_history'); // Replace with your actual constraint name
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('floor_id', 'loot_table_unique_column_constraint'); // Replace with your actual constraint name
    await queryInterface.removeConstraint('floor_id', 'mita_algorithm_unique_column_constraint'); // Replace with your actual constraint name
    
    await queryInterface.addConstraint('mita_algorithm', {
      fields: ['floor_id'],
      type: 'foreign key',
      name: 'floor_from_kill_history',
      references:{
        table: 'kill_history',
        field: "floor"
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  },
  }
;
