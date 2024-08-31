'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
    await queryInterface.createTable('mita_algorithm', {
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
        static_mate_id: {
          //here i need to add a foreign key with queryInterface.addConstraint
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        loot_table_id: {
          //here i need to add a foreign key with queryInterface.addConstraint
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        number_killed: {
          //here i need to add a foreign key with queryInterface.addConstraint
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        floor_id: {
          //here i need to add a foreign key with queryInterface.addConstraint
          type: Sequelize.INTEGER,
          allowNull: false
        }
      })
      await queryInterface.addConstraint('mita_algorithm', { //mita_algorithm is the table we are looking at (aka this one)
        fields: ['static_mate_id'], //name of the json/class made above i want to be a foreign key
        type: 'foreign key', //making it a foreign key lol
        name: 'static_member', //optional name attached
        references:{
          table: 'static_mates', //this is refferencing the previous table  
          field: "id" //this is refferencing the previous table
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
      await queryInterface.addConstraint('mita_algorithm', {
        fields: ['loot_table_id'],
        type: 'foreign key',
        name: 'loot_table',
        references:{
          table: 'loot_table',
          field: "id"
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });


      ;
    },
      async down (queryInterface, Sequelize) {
        await queryInterface.dropTable('mita_algorithm');
        }
  };