import express from "express";
import { findAllLootTable } from "../controller/loot_table.controller.js";
//import {findSingleLootTable} from '../controller/loot_table.controller.js'
import { createSingleLootTable } from "../controller/loot_table.controller.js";
import { updateLootTable } from "../controller/loot_table.controller.js";
import { deleteLootTable } from "../controller/loot_table.controller.js";
export const Loot_Table_Router = express.Router();

// //GET METHODS:
Loot_Table_Router.get("/AllLoot", findAllLootTable);
//Loot_Table_Router.get("/SingeLoot", findSingleLootTable);

//POST METHODS:
Loot_Table_Router.post("/CreateSingleItem", createSingleLootTable);

//PUT METHODS:
Loot_Table_Router.put("/UpdateSingleItem", updateLootTable);

//Delete METHODS:
Loot_Table_Router.delete("/DeleteSingleItem", deleteLootTable);
