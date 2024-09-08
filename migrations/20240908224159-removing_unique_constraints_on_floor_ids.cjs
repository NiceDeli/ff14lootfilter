'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('floor', 'floor_name_unique_column_constraint'); // Replace with your actual constraint name
    await queryInterface.removeConstraint('floor', 'floor_abbreviation_unique_column_constraint'); // Replace with your actual constraint name
    await queryInterface.removeConstraint('loot_table', 'loot_table_unique_column_constraint'); // Replace with your actual constraint name
    await queryInterface.removeConstraint('mita_algorithm', 'mita_algorithm_unique_column_constraint'); // Replace with your actual constraint name
    await queryInterface.removeConstraint('kill_history', 'kill_history_unique_column_constraint'); // Replace with your actual constraint name
  },

  async down (queryInterface, Sequelize) {
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

    await queryInterface.addConstraint('floor', {
      fields: ['floor_name'],
      type: 'unique',
      name: 'floor_name_unique_column_constraint',
    });

    await queryInterface.addConstraint('floor', {
      fields: ['floor_abbreviation'],
      type: 'unique',
      name: 'floor_abbreviation_unique_column_constraint',
    });

    await queryInterface.addConstraint('kill_history', {
      //this is giving floor.kill_history the ability to be treated as a foreign key without being one
      fields: ['floor'], // Replace with your actual column name
      type: 'unique',
      name: 'kill_history_unique_column_constraint', // Provide a constraint name
    });
  }
};
