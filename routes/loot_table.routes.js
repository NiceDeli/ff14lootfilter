import express from 'express';
import { Loot_Table } from '../models/loot_table.model.js';
import { getMany_Loot, getSingle_Loot, createLoot, updateLoot, deleteLoot } from '../controller/loot_table.controller.js';

export const Loot_Table_Router = express.Router();


//GET METHODS:
Loot_Table_Router.get('/', getMany_Loot);
Loot_Table_Router.get("/:id", getSingle_Loot);

//POST METHODS:
Loot_Table_Router.post("/", createLoot);

//PUT METHODS:
Loot_Table_Router.put("/:id", updateLoot);

//Delete METHODS:
Loot_Table_Router.delete("/:id", deleteLoot);

