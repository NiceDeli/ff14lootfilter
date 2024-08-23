import express from 'express';
import { Desirable_Loot } from '../models/desirable_loot.model.js';
import { getAll_Desirable_Loot, getSingle_Desirable_Loot, create_Desirable_Loot, updated_Desirable_Loot ,delete_Desirable_Loot} from '../controller/desirable_loot.controller.js';


export const Desirable_Loot_Router = express.Router();


//GET METHODS:
Desirable_Loot_Router.get('/', getAll_Desirable_Loot);
Desirable_Loot_Router.get("/:id",  getSingle_Desirable_Loot);

//POST METHODS:
Desirable_Loot_Router.post("/", create_Desirable_Loot);

//PUT METHODS:
Desirable_Loot_Router.put("/:id", updated_Desirable_Loot );

//Delete METHODS:
Desirable_Loot_Router.delete("/:id", delete_Desirable_Loot);