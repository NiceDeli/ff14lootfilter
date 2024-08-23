import express from 'express';
import { Kill_History } from '../models/kill_history.model.js';
import { getAll_Kill_History, getSingle_Kill_History, createKill, updateKill, deleteKill } from '../controller/kill_history.controller.js';

export const Kill_History_Router = express.Router();


//GET METHODS:
//Main endpoint is: /killHistoryRoutes

//What is the full url to grab all the kill history
// /killHistoryRoutes/

// http://localhost:3000/killHistoryRoutes/ | METHOD: GET


Kill_History_Router.get('/',  getAll_Kill_History);
Kill_History_Router.get("/:id",  getAll_Kill_History);

//POST METHODS:
Kill_History_Router.post("/", createKill);

//PUT METHODS:
Kill_History_Router.put("/:id", updateKill);

//Delete METHODS:
Kill_History_Router.delete("/:id", deleteKill);