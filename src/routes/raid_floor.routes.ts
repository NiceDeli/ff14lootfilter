import express from "express";
import { findAllFloor } from "../controller/raid_floor.controller.js";
//import {findSingleFloor} from '../controller/raid_floor.controller.js'
import { createSingleFloor } from "../controller/raid_floor.controller.js";
import { updateFloor } from "../controller/raid_floor.controller.js";
//import {deleteFloor} from '../controller/floor.controller.js'
export const Floor_Router = express.Router();

// //GET METHODS:
Floor_Router.get("/AllFloor", findAllFloor);
//Floor_Router.get("/SingeLoot", findSingleFloor);

//POST METHODS:
Floor_Router.post("/CreateSingleFloor", createSingleFloor);

//PUT METHODS:
Floor_Router.put("/UpdateSingleFloor", updateFloor);

//Delete METHODS:
//Floor_Router.delete("/DeleteSingleItem", deleteFloor);
