'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
    await queryInterface.addConstraint('kill_history', {
      //this is giving floor.kill_history the ability to be treated as a foreign key without being one
      fields: ['floor'], // Replace with your actual column name
      type: 'unique',
      name: 'kill_history_unique_column_constraint', // Provide a constraint name
    });

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

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('kill_history', 'kill_history_unique_column_constraint'); // Replace with your actual constraint name
    await queryInterface.removeConstraint('mita_algorithm', 'floor_from_kill_history'); // Replace with your actual constraint name
  }
};
