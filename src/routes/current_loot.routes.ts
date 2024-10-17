import express from "express";
import { getAllCurrentLoot } from "../controller/current_loot.controller.js";
import {getSingleCurrentLoot} from '../controller/current_loot.controller.js'
import { createSingleCurrentLoot } from "../controller/current_loot.controller.js";
import { updateCurrentLoot } from "../controller/current_loot.controller.js";
import { deleteCurrentLoot } from "../controller/current_loot.controller.js";
export const Current_Loot_Router = express.Router();

// //GET METHODS:
Current_Loot_Router.get("/AllCurrentLoot", getAllCurrentLoot);
Current_Loot_Router.get("/SingleCurrentLoot", getSingleCurrentLoot);

// //POST METHODS:
Current_Loot_Router.post("/CreateSingleCurrentLoot", createSingleCurrentLoot);

// //PUT METHODS:
Current_Loot_Router.put("/UpdateSingleCurrentLoot", updateCurrentLoot);

// //Delete METHODS:
Current_Loot_Router.delete("/DeleteSingleCurrentLoot/:id", deleteCurrentLoot);
