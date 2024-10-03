'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
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
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('floor', 'floor_name_unique_column_constraint'); // Replace with your actual constraint name
    await queryInterface.removeConstraint('floor', 'floor_abbreviation_unique_column_constraint'); // Replace with your actual constraint name
  }
};
