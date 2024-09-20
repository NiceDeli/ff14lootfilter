// sync.js
const sequelize = require("./db");
const setupAssociations = require("./associations");

require("./loot_table.model"); // Import models
require("./floor.model"); // Import models

setAssociations(); // Set up associations

const syncDatabase = async () => {
  try {
    await sequelize.sync({ force: true }); // Use { force: true } during development
    console.log("Database synchronized");
  } catch (error) {
    console.error("Error synchronizing database:", error);
  }
};

syncDatabase();
