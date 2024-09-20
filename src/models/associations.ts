// associations.js
const LootTable = require("./loot_table.model");
const Floor = require("./floor.model");

const setAssociations = () => {
  LootTable.hasMany(Floor, { foreignKey: "id", as: "floor_id" });
  Floor.belongsTo(LootTable, { foreignKey: "id", as: "raid_floor_id" });
};

module.exports = setupAssociations;
