"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("current_loot", {
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
    });
    await queryInterface.addConstraint("current_loot", {
      fields: ["static_mate_id"],
      type: "foreign key",
      name: "static_member",
      references: {
        table: "static_mates", //this is refferencing the previous table
        field: "id", //this is refferencing the previous table
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
    await queryInterface.addConstraint("current_loot", {
      fields: ["loot_table_id"],
      type: "foreign key",
      name: "loot_table",
      references: {
        table: "loot_table",
        field: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("current_loot");
  },
};

//the columns i made were the wrong type for the keys, the only way we could fix thing either modify or delete the table,
//
