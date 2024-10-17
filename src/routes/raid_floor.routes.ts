import express from "express";
import { getAllFloor } from "../controller/raid_floor.controller.js";
import { createSingleFloor } from "../controller/raid_floor.controller.js";
import { updateFloor } from "../controller/raid_floor.controller.js";
//import {deleteFloor} from '../controller/floor.controller.js'
export const Floor_Router = express.Router();

//GET METHODS:
Floor_Router.get("/AllFloor", getAllFloor);

//POST METHODS:
Floor_Router.post("/CreateSingleFloor/:id", createSingleFloor);

//PUT METHODS:
Floor_Router.put("/UpdateSingleFloor/:id", updateFloor);

//Delete METHODS:
//Floor_Router.delete("/DeleteSingleItem/:id", deleteFloor);
