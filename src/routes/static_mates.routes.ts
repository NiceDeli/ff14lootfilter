//import { getMany_Static_Mates, getSingle_Static_Mate, createStatic_Mate, updateStatic_Mate, deleteStatic_Mate } from '../controller/static_mates.controller.js';
import express from 'express';
import {findAllStaticMates} from '../controller/static_mates.controller.js'
import {findSingleStaticMate} from '../controller/static_mates.controller.js'
import {createSingleStaticMate} from '../controller/static_mates.controller.js'
import {updateStaticMate} from '../controller/static_mates.controller.js'
import {deleteStaticMate} from '../controller/static_mates.controller.js'
export const Static_Mates_Router = express.Router();

// //GET METHODS:
Static_Mates_Router.get('/', findAllStaticMates);
Static_Mates_Router.get("/:id", findSingleStaticMate);

//POST METHODS:
Static_Mates_Router.post("/createSingleStaticMate", createSingleStaticMate);

//PUT METHODS:
Static_Mates_Router.put("/:id/updateStaticMember", updateStaticMate);

//Delete METHODS:
Static_Mates_Router.delete("/:id", deleteStaticMate);

