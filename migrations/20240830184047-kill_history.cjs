'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
    await queryInterface.createTable('kill_history', {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        createdAt: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.NOW,
        },
        updatedAt: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.NOW,
        },
        floor: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        date_killed: {
          type: Sequelize.DATE,
          allowNull: false
        }
      })
    },
    
      async down (queryInterface, Sequelize) {
        await queryInterface.dropTable('kill_history');
        }
  };

