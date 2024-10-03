import express from "express";
import { findAllDesirableLoot } from "../controller/desirable_loot.controller.js";
// import {findSingleDesirableLoot} from '../controller/desirable_loot.controller.js'
import { createSingleDesirableLoot } from "../controller/desirable_loot.controller.js";
import { updateDesirableLoot } from "../controller/desirable_loot.controller.js";
// import { deleteDesirableLoot } from "../controller/desirable_loot.controller.js";
export const Desirable_Loot_Router = express.Router();

// //GET METHODS:
Desirable_Loot_Router.get("/AllDesirableLoot", findAllDesirableLoot);
// Desirable_Loot_Router.get("/SingleLoot", findSingleDesirableLoot);

// //POST METHODS:
Desirable_Loot_Router.post("/CreateSingleDesirableLoot", createSingleDesirableLoot);

// //PUT METHODS:
Desirable_Loot_Router.put("/UpdateSingleDesirableLoot", updateDesirableLoot);

// //Delete METHODS:
// Desirable_Loot_Router.delete("/DeleteSingleItem", deleteDesirableLoot);
