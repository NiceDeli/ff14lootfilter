import express from "express";
import { getAllKillHistory } from "../controller/kill_history.controller.js";
import { getSingleKillHistory } from '../controller/kill_history.controller.js'
import { createSingleKillHistory } from "../controller/kill_history.controller.js";
import { updateKillHistory } from "../controller/kill_history.controller.js";
import { deleteKillHistory } from "../controller/kill_history.controller.js";
export const Kill_History_Router = express.Router();

// //GET METHODS:
Kill_History_Router.get("/AllKillHistory", getAllKillHistory);
Kill_History_Router.get("/SingleKillHistory", getSingleKillHistory);

//POST METHODS:
Kill_History_Router.post("/CreateSingleKillHistory", createSingleKillHistory);

//PUT METHODS:
Kill_History_Router.put("/UpdateSingleKillHistory/:id", updateKillHistory);

//Delete METHODS:
Kill_History_Router.delete("/DeleteSingleKillHistory/:id", deleteKillHistory);