import express from "express";
import { findAllStaticMates, findSingleStaticMate } from "../controller/static_mates.controller.js";
import { createSingleStaticMate } from "../controller/static_mates.controller.js";
import { updateStaticMate } from "../controller/static_mates.controller.js";
import { deleteStaticMate } from "../controller/static_mates.controller.js";
export const Static_Mates_Router = express.Router();

// //GET METHODS:
Static_Mates_Router.get("/AllStaticMates",findAllStaticMates);
Static_Mates_Router.get("/findSingleStaticMate/:id", findSingleStaticMate);
//make route here that gets all 3 things or just 1 at a time

//POST METHODS:
Static_Mates_Router.post("/createSingleStaticMate", createSingleStaticMate);

//PUT METHODS:
Static_Mates_Router.put("/updateStaticMember", updateStaticMate);

//Delete METHODS:
Static_Mates_Router.delete("deleteStaticMember/:id", deleteStaticMate);
