import express from 'express';
import { getMany_Static_Mates, getSingle_Static_Mate, createStatic_Mate, updateStatic_Mate, deleteStatic_Mate } from '../controller/static_mates.controller.js';

export const Static_Mates_Router = express.Router();

//So in the previous code I defined "static_mates" like this

//

//GET METHODS:
Static_Mates_Router.get('/', getMany_Static_Mates);
Static_Mates_Router.get("/:id", getSingle_Static_Mate);

//POST METHODS:
Static_Mates_Router.post("/", createStatic_Mate);

//PUT METHODS:
Static_Mates_Router.put("/:id", updateStatic_Mate);

//Delete METHODS:
Static_Mates_Router.delete("/:id", deleteStatic_Mate);

