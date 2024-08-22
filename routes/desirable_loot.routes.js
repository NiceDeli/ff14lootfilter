import express from 'express';
import { Desirable_Loot } from '../models/desirable_loot.model.js';
import { getAll_Desirable_Loot, getSingle_Desirable_Loot, create_Desirable_Loot, updated_Desirable_Loot ,delete_Desirable_Loot} from '../controller/desirable_loot.controller.js';

export const desirable_loot_Router = express.Router();


//GET METHODS:
desirable_loot_Router .get('/', getAll_Desirable_Loot);
desirable_loot_Router .get("/:id",  getAll_Desirable_Loot);

//POST METHODS:
desirable_loot_Router .post("/", create_Desirable_Loot);

//PUT METHODS:
desirable_loot_Router .put("/:id", updated_Desirable_Loot );

//Delete METHODS:
desirable_loot_Router .delete("/:id", delete_Desirable_Loot);