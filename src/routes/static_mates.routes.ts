import express from "express";
import { findAllStaticMates } from "../controller/static_mates.controller.js";
import { createSingleStaticMate } from "../controller/static_mates.controller.js";
import { updateStaticMate } from "../controller/static_mates.controller.js";
import { deleteStaticMate } from "../controller/static_mates.controller.js";
export const Static_Mates_Router = express.Router();

// //GET METHODS:
Static_Mates_Router.get("/AllStaticMates",findAllStaticMates);

//POST METHODS:
Static_Mates_Router.post("/createSingleStaticMate", createSingleStaticMate);

//PUT METHODS:
Static_Mates_Router.put("/:id/updateStaticMember", updateStaticMate);

//Delete METHODS:
Static_Mates_Router.delete("/:id", deleteStaticMate);
