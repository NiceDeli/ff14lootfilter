import express from 'express';
import { Loot_History } from '../models/loot_history.model.js';
import { getAll_Loot_History, getSingle_Loot_History, createLoot, updateLoot, deleteLoot } from '../controller/loot_history.controller.js';

export const Loot_History_Router = express.Router();


//GET METHODS:
Loot_History_Router .get('/',  getAll_Loot_History);
Loot_History_Router .get("/:id",  getAll_Loot_History);

//POST METHODS:
Loot_History_Router .post("/", createLoot);

//PUT METHODS:
Loot_History_Router .put("/:id", updateLoot);

//Delete METHODS:
Loot_History_Router .delete("/:id", deleteLoot);
