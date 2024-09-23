import express from "express";
import { Floor } from "../models/floor.model.js";
import {
    createFloorPayload,
    FloorServiceReturn,
    updateFloorPayload,
    findFloorPayload,
    deleteFloorPayload,
  } from "../controller/types/raid_floor_types.js";
import { getAllFloor } from "../controller/raid_floor.controller.js";
import {getFloor} from '../controller/raid_floor.controller.js'
import { createSingleFloor } from "../controller/raid_floor.controller.js";
import { updateFloor } from "../controller/raid_floor.controller.js";
import { findAllLootTable } from "../controller/loot_table.controller.js";
//import {deleteFloor} from '../controller/floor.controller.js'
export const Floor_Router = express.Router();

//GET METHODS:
Floor_Router.get("/AllFloor", async (req, res)=> {
  const createFloorPayload  = req.query;  
  try {
        const get_all_floors = getAllFloor;
        const where ={};
        res.send(getAllFloor);
      }

      catch (error) {
        console.error(error)
        res.status(500).json({
          status: "Error",
          data: error.message,
        });
}});


Floor_Router.get("/:floor_abbreviation", async (req, res)=> {
  const {floor_abbreviation} = req.params;
  try{
    const where = {};
    if (floor_abbreviation){
      floor_abbreviation = floor_abbreviation
    }
    const get_single_floor = getFloor; 
    res.send(getFloor);
  }
  

  catch (error) {
    console.error(error)
    res.status(500).json({
      status: "Error",
      data: error.message,
    });
}});

Floor_Router.get("/:floor_name", async (req, res)=> {
  try{
    const {floor_name} = req.params;
    const get_single_floor = getFloor; 
    res.send(getFloor);
  }

  catch (error) {
    console.error(error)
    res.status(500).json({
      status: "Error",
      data: error.message,
    });
}});

//POST METHODS:
Floor_Router.post("/CreateSingleFloor", createSingleFloor);

//PUT METHODS:
Floor_Router.put("/UpdateSingleFloor/:id", updateFloor);

//Delete METHODS:
//Floor_Router.delete("/DeleteSingleItem", deleteFloor);
